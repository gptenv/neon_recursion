import { readFileSync } from 'node:fs';
const bytes = readFileSync(new URL('../touchstone.wasm', import.meta.url));
const mod = await WebAssembly.instantiate(bytes, {});
const v = mod.instance.exports.touchstone_version();
const w = mod.instance.exports.recipe_word(123, 4, 5);
if (v !== 0x000a0001) throw new Error('bad wasm version: '+v);
if (typeof w !== 'number') throw new Error('bad recipe_word');
console.log('wasm ok', v.toString(16), w >>> 0);
