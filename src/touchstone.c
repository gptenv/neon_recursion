/*
 * touchstone.c - tiny dependency-free WASM helper for Neon Recursion WebGL/WASM.
 * It deliberately exports only deterministic recipe words. The browser app turns
 * those words into geometry, palette, spectral, entropy, and naming parameters.
 */
#include <stdint.h>

static uint32_t rotl32(uint32_t x, uint32_t r) { return (x << r) | (x >> (32u - r)); }
static uint32_t mix32(uint32_t x) {
    x ^= x >> 16; x *= 0x7feb352du;
    x ^= x >> 15; x *= 0x846ca68bu;
    x ^= x >> 16;
    return x;
}

__attribute__((export_name("touchstone_version")))
uint32_t touchstone_version(void) { return 0x000a0001u; }

__attribute__((export_name("recipe_word")))
uint32_t recipe_word(uint32_t seed, uint32_t serial, uint32_t slot) {
    uint32_t x = seed ^ 0x9e3779b9u;
    x ^= rotl32(serial * 0x85ebca6bu, 7u);
    x ^= rotl32((slot + 1u) * 0xc2b2ae35u, (slot % 17u) + 3u);
    x = mix32(x + 0x27d4eb2fu + slot * 0x165667b1u);
    x ^= mix32(seed + serial + slot * 0x632be5abu);
    return mix32(x);
}

__attribute__((export_name("recipe_family")))
uint32_t recipe_family(uint32_t seed, uint32_t serial) {
    return recipe_word(seed, serial, 31u) % 24u;
}
