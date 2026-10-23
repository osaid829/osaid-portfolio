import { fallbackProjects, type Project } from '../data/fallback-projects.ts';
export type ProjectFeed = {
    projects: Project[];
    source: 'github' | 'unconfigured' | 'unavailable' | 'empty';
};
export function safeExternalUrl(value: unknown, host?: string): string | null {
    if (typeof value !== 'string' || !value.trim())
        return null;
    try {
        const url = new URL(value);
        return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password && (!host || url.hostname === host) ? url.href : null;
    }
    catch {
        return null;
    }
}
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null; }
export function parseRepositories(data: unknown, username: string): Project[] {
    if (!Array.isArray(data))
        throw new Error('Unexpected GitHub response');
    return data.filter(isRecord).filter(repo => repo.fork !== true && repo.archived !== true && repo.disabled !== true && repo.name !== username && repo.name !== '.github').flatMap(repo => {
        const githubUrl = safeExternalUrl(repo.html_url, 'github.com');
        if (typeof repo.id !== 'number' || typeof repo.name !== 'string' || !githubUrl)
            return [];
        const updatedAt = typeof repo.updated_at === 'string' && Number.isFinite(Date.parse(repo.updated_at)) ? repo.updated_at : null;
        return [{ id: String(repo.id), name: repo.name, description: typeof repo.description === 'string' && repo.description.trim() ? repo.description : 'Explore the source, documentation and implementation on GitHub.', language: typeof repo.language === 'string' ? repo.language : null, stars: typeof repo.stargazers_count === 'number' && Number.isFinite(repo.stargazers_count) ? Math.max(0, repo.stargazers_count) : 0, githubUrl, homepage: safeExternalUrl(repo.homepage), updatedAt, category: 'PUBLIC REPOSITORY' }];
    }).sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || Date.parse(b.updatedAt ?? '1970-01-01') - Date.parse(a.updatedAt ?? '1970-01-01')).slice(0, 6);
}
export async function getGitHubProjects(username: string | null, fetcher: typeof fetch = fetch): Promise<ProjectFeed> {
    if (!username || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username))
        return { projects: fallbackProjects, source: 'unconfigured' };
    try {
        const response = await fetcher(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`, { headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
        if (!response.ok)
            throw new Error(`GitHub returned ${response.status}`);
        const projects = parseRepositories(await response.json(), username);
        return projects.length ? { projects, source: 'github' } : { projects: fallbackProjects, source: 'empty' };
    }
    catch {
        return { projects: fallbackProjects, source: 'unavailable' };
    }
}
