import {spawn} from 'node:child_process';
import {mkdir, readdir, writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('qa',{recursive:true});
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3100','-H','127.0.0.1'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',d=>process.stdout.write(d));server.stderr.on('data',d=>process.stderr.write(d));
try {
 let response;
 for(let i=0;i<80;i++) {try {response=await fetch('http://127.0.0.1:3100');if(response.ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 assert.ok(response?.ok,'Production server must respond');
 const html=await response.text();
  for(const section of ['home','about','skills','approach','projects','contact'])assert.ok(html.includes(`id="${section}"`),section);
  const feedSource=html.match(/data-source="([a-z]+)"/)?.[1];
  assert.equal(feedSource, 'curated', 'Curated project data source');
  assert.ok(html.includes('3D Interactive Showcase'));
  assert.ok(!html.includes('Not connected'));
 assert.ok(!html.includes('href="[GITHUB_USERNAME]"'));
 const cssRefs=[...html.matchAll(/href="([^\"]+\.css[^\"]*)"/g)].map(match=>match[1]);
 const css=await Promise.all(cssRefs.map(async url=>(await fetch(new URL(url,'http://127.0.0.1:3100'))).text()));
 const all=css.join('\n');
  for(const name of ['core-fallback.svg','core-network.svg','divider-02.svg','project-texture.png','motion-field.svg']) assert.ok(all.includes(name),`${name} integrated in production CSS`);
  assert.ok(html.includes('skill-network.svg'),'skill-network.svg in markup');
 const assets=await readdir('public/generated');
 for(const name of assets)assert.equal((await fetch(`http://127.0.0.1:3100/generated/${name}`)).status,200,name);
 assert.equal((await fetch('http://127.0.0.1:3100/no-such-page')).status,404);
 const jsChunks=[...html.matchAll(/src="([^\"]+\.js[^\"]*)"/g)].map(match=>match[1]);
 for(const url of jsChunks)assert.equal((await fetch(new URL(url,'http://127.0.0.1:3100'))).status,200,url);
  await writeFile('qa/http-results.json',JSON.stringify({http:200,sections:6,artAssets:assets.length,cssIntegration:true,feedSource,curatedProjects:true,socialPlaceholders:false,javascriptChunks:jsChunks.length,notFound:404},null,2));
 console.log(`Production HTTP checks passed: ${assets.length} art files, all sections, fallback records, CSS and JS, 404.`);
}finally {server.kill('SIGTERM');}
