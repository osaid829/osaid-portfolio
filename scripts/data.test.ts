import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getGitHubProjects, parseRepositories, safeExternalUrl } from '../lib/github.ts';
const record = (id: number, stars: number, date: string, extra: Record<string, unknown> = {}) => ({ id, name: `sample-${id}`, html_url: `https://github.com/test/sample-${id}`, stargazers_count: stars, updated_at: date, description: 'Test fixture only', ...extra });
test('normalizes, ranks, filters forks and rejects unsafe links', () => {
    const result = parseRepositories([record(1, 0, '2025-01-01'), record(2, 4, '2024-01-01', { homepage: 'javascript:alert(1)' }), record(3, 4, '2026-01-01'), record(4, 8, '2026-01-01', { fork: true }), record(5, 9, '2026-01-01', { archived: true })], 'test');
    assert.deepEqual(result.map(r => r.id), ['3', '2', '1']);
    assert.equal(result[1].homepage, null);
    assert.equal(safeExternalUrl('https://evil.test', 'github.com'), null);
    assert.equal(safeExternalUrl('https://name:secret@example.com'), null);
});
test('missing username never makes a request or fabricates statistics', async () => {
    let called = false;
    const mock: typeof fetch = async () => { called = true; throw new Error('unexpected'); };
    const result = await getGitHubProjects('[GITHUB_USERNAME]', mock);
    assert.equal(called, false);
    assert.equal(result.source, 'unconfigured');
    assert.ok(result.projects.every(p => p.stars === null));
});
test('success uses public endpoint with revalidation and no authorization', async () => {
    const mock: typeof fetch = async (url, options) => { assert.match(String(url), /^https:\/\/api.github.com\/users\/test\/repos\?/); assert.equal(options?.next?.revalidate, 3600); assert.equal(new Headers(options?.headers).has('Authorization'), false); return new Response(JSON.stringify([record(1, 2, '2026-01-01')]), { status: 200 }); };
    const result = await getGitHubProjects('test', mock);
    assert.equal(result.source, 'github');
    assert.equal(result.projects[0].stars, 2);
});
test('rate limit, network failure, malformed response and empty feed retain fallback', async () => {
    for (const mock of [async () => new Response('', { status: 403 }), async () => { throw new Error('offline'); }, async () => new Response('{'), async () => new Response('{}')]) {
        const result = await getGitHubProjects('test', mock);
        assert.equal(result.source, 'unavailable');
        assert.ok(result.projects.length > 0);
    }
    const empty = await getGitHubProjects('test', async () => new Response('[]'));
    assert.equal(empty.source, 'empty');
});
