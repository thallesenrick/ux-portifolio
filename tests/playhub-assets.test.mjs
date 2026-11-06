import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';

const source = new URL('../src/assets/projects/playhub/originals/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', source), 'utf8'));
const motion = JSON.parse(readFileSync(new URL('motion-manifest.json', source), 'utf8'));

test('Playhub preserves all 24 user-supplied screen exports', () => {
  assert.equal(manifest.screens.length, 24);
  assert.equal(new Set(manifest.screens.map(screen => screen.id)).size, 24);
  for (const screen of manifest.screens) {
    const file = readFileSync(new URL(screen.file, source));
    assert.equal(createHash('sha256').update(file).digest('hex'), screen.sha256, screen.file);
    if (screen.source.endsWith('.png')) assert.equal(screen.sha256, screen.sourceSha256);
  }
});

test('all Playhub motion frames come from the supplied screens', () => {
  for (const [name, screens] of Object.entries(motion.flows)) {
    for (const screen of screens) {
      const original = manifest.screens.find(original => original.id === screen.id);
      assert.ok(original, `Unknown screen in ${name}: ${screen.id}`);
      assert.equal(screen.sha256, original.sha256);
    }
    const gif = readFileSync(new URL(`../public/playhub/motion/${name}.gif`, import.meta.url));
    assert.ok(['GIF87a', 'GIF89a'].includes(gif.subarray(0, 6).toString()));
    assert.equal(gif.readUInt16LE(6), 393);
    assert.equal(gif.readUInt16LE(8), 852);
    const webm = readFileSync(new URL(`../public/playhub/motion/${name}.webm`, import.meta.url));
    assert.ok(webm.length > 10000);
    assert.equal(webm.subarray(0, 4).toString('hex'), '1a45dfa3');
  }
});
