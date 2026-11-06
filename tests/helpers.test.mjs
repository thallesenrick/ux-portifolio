import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import ts from 'typescript';

// Compile pure TypeScript helpers in memory without adding a runtime dependency.
function loadHelper(path) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  new Function('exports', 'require', code)(exports, createRequire(import.meta.url));
  return exports;
}

const { colorHue, vividColor, sampleHeroIntro } = loadHelper('../src/lib/hero-intro.ts');
const { splitExpense } = loadHelper('../src/lib/split-expense.ts');

test('every selectable hue round-trips without wrapping at the right edge', () => {
  for (let hue = 0; hue <= 359; hue++) {
    assert.ok(Math.abs(colorHue(vividColor(hue)) - hue) < 0.3);
  }
});

test('hero animation stays continuous across the red boundary', () => {
  for (const hues of [[350, 110, 230, 350], [5, 125, 245, 5], [120, 240, 0, 120]]) {
    const colors = hues.map(vividColor);
    let previous = colorHue(sampleHeroIntro(0, colors).color);
    for (let step = 1; step <= 10000; step++) {
      const hue = colorHue(sampleHeroIntro(step / 10000, colors).color);
      assert.ok(Math.abs(hue - previous) < 2);
      previous = hue;
    }
    assert.equal(sampleHeroIntro(1, colors).reveal, 53);
  }
});

test('expense allocation conserves cents and ignores duplicate participants', () => {
  assert.deepEqual(splitExpense(100, [3, 1, 2, 1]), { 1: 34, 2: 33, 3: 33 });
  for (let cents = 0; cents < 1000; cents++) {
    const shares = Object.values(splitExpense(cents, [1, 2, 3, 4, 5, 6, 7]));
    assert.equal(shares.reduce((sum, share) => sum + share, 0), cents);
    assert.ok(Math.max(...shares) - Math.min(...shares) <= 1);
  }
  assert.throws(() => splitExpense(-1, [1]));
  assert.throws(() => splitExpense(100, []));
  assert.throws(() => splitExpense(0.5, [1]));
});
