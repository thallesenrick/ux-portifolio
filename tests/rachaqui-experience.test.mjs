import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import ts from 'typescript';

const root = new URL('../src/assets/projects/rachaqui/experience-source/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', root), 'utf8'));
const moduleSource = readFileSync(new URL('../src/data/rachaqui-experience.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(moduleSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const data = {};
new Function('exports', 'require', code)(data, path => path.endsWith('.png') ? { default: path } : { copy: (pt, en) => ({ pt, en, es: en }) });

test('RachAqui experience keeps the 14 original PNGs intact', () => {
  assert.equal(manifest.screens.length, 14);
  for (const screen of manifest.screens) {
    const bytes = readFileSync(new URL(screen.file, root));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), screen.sha256, screen.file);
    assert.equal(bytes.readUInt32BE(16), 430);
    assert.equal(bytes.readUInt32BE(20), 932);
  }
});

test('every interactive hotspot stays inside a supplied screen and targets another supplied state', () => {
  const { rachaquiExperienceScreens: screens, rachaquiExperienceHotspots: hotspots } = data;
  const ids = new Set(manifest.screens.map(screen => screen.id));
  assert.equal(screens.length, ids.size);
  assert.equal(new Set(screens.map(screen => screen.id)).size, ids.size);
  for (const screen of screens) {
    assert.ok(ids.has(screen.id));
    assert.ok(screen.src.endsWith(`screen-${screen.id}.png`));
    assert.ok(screen.group >= 0 && screen.group < 6);
    for (const spot of hotspots[screen.id]) {
      assert.ok(ids.has(spot.target), `Unprovided state: ${spot.target}`);
      assert.ok(spot.x >= 0 && spot.y >= 0 && spot.width > 0 && spot.height > 0);
      assert.ok(spot.x + spot.width <= 430 && spot.y + spot.height <= 932);
    }
  }
});

test('tap targets do not cover other actions', () => {
  for (const [screen, hotspots] of Object.entries(data.rachaquiExperienceHotspots)) {
    for (let i = 0; i < hotspots.length; i++) {
      for (let j = i + 1; j < hotspots.length; j++) {
        const a = hotspots[i], b = hotspots[j];
        const overlap = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
        assert.equal(overlap, false, `Overlapping actions on screen ${screen}: ${a.label.en} / ${b.label.en}`);
      }
    }
  }
});
