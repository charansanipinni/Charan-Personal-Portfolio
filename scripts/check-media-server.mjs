import { spawn } from 'node:child_process';
import { once } from 'node:events';
import assert from 'node:assert/strict';
const server = spawn(process.execPath, ['scripts/serve.mjs'], { env: { ...process.env, PORT: '4175' }, stdio: ['ignore','pipe','pipe'] });
try {
  await Promise.race([once(server.stdout,'data'), once(server,'exit').then(()=>{throw new Error('Preview server exited before readiness');})]);
  const base='http://127.0.0.1:4175';
  const page=await fetch(base); assert.equal(page.status,200);
  assert((await page.text()).includes('charan_sanipinni/'));
  for (const name of ['youtube-workflow-original.jpeg', 'hidden-muses-original.jpeg']) {
    const screenshot = await fetch(`${base}/assets/${name}`);
    assert.equal(screenshot.status, 200); assert.equal(screenshot.headers.get('content-type'), 'image/jpeg');
  }
  for(const name of ['scitisense','akbar']){
    const url=`${base}/assets/${name}-walkthrough.mp4`;
    const head=await fetch(url,{method:'HEAD'});
    assert.equal(head.status,200); assert.equal(head.headers.get('content-type'),'video/mp4');
    const size=Number(head.headers.get('content-length')); assert(size>1000);
    const partial=await fetch(url,{headers:{Range:'bytes=0-1023'}});
    assert.equal(partial.status,206); assert.equal((await partial.arrayBuffer()).byteLength,1024);
    assert.equal(partial.headers.get('content-range'),`bytes 0-1023/${size}`);
    const suffix=await fetch(url,{headers:{Range:'bytes=-20'}});
    assert.equal(suffix.status,206); assert.equal((await suffix.arrayBuffer()).byteLength,20);
    const invalid=await fetch(url,{headers:{Range:`bytes=${size+1}-`}}); assert.equal(invalid.status,416);
    const hero=await fetch(`${base}/assets/${name}-hero.webp`); assert.equal(hero.status,200); assert.equal(hero.headers.get('content-type'),'image/webp');
  }
  console.log('Verified local page, image MIME types, both MP4s, byte ranges, suffix seeking, and invalid-range handling.');
} finally {server.kill();}
