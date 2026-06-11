# Neon Recursion WebGL/WASM Makefile
#
# Default `make` now builds touchstone.wasm (requires wasm32-capable clang or Emscripten).
# `make clean` now removes the wasm (as requested).

WASM_CC ?= clang
WASM_CFLAGS ?= --target=wasm32 -O3 -nostdlib -fvisibility=hidden
WASM_LDFLAGS ?= -Wl,--no-entry -Wl,--export=touchstone_version -Wl,--export=recipe_word -Wl,--export=recipe_family -Wl,--export=recipe_mutate -Wl,--strip-all

.PHONY: all check clean distclean wasm rebuild-wasm serve help

all: touchstone.wasm check

check: touchstone.wasm
	@node --check app.js
	@node tools/check_wasm.mjs
	@printf 'check ok: bundled touchstone.wasm is present and usable\n'

# Default rule now builds the wasm (user request). The build will fail with
# a helpful message if the compiler doesn't support wasm32.
touchstone.wasm: src/touchstone.c
	@tmp="$$(mktemp -t neon-wasm-check-XXXXXX).o"; \
	trap 'rm -f "$$tmp"' EXIT; \
	printf 'int x;\n' | $(WASM_CC) --target=wasm32 -x c -c -o "$$tmp" - >/dev/null 2>&1 || { \
		printf 'error: %s cannot compile --target=wasm32 on this machine.\n' '$(WASM_CC)' >&2; \
		printf 'Apple/system clang often lacks the WebAssembly backend.\n' >&2; \
		printf 'Install or source a wasm-capable compiler and retry:\n' >&2; \
		printf '  brew install llvm\n' >&2; \
		printf '  export PATH="/opt/homebrew/opt/llvm/bin:$$PATH"   # Apple Silicon\n' >&2; \
		printf '  export PATH="/usr/local/opt/llvm/bin:$$PATH"      # Intel Homebrew\n' >&2; \
		printf 'or use Emscripten/WASI SDK and set WASM_CC accordingly.\n' >&2; \
		exit 1; \
	}; \
	$(WASM_CC) $(WASM_CFLAGS) $(WASM_LDFLAGS) src/touchstone.c -o touchstone.wasm
	@printf 'built touchstone.wasm\n'

wasm: touchstone.wasm

rebuild-wasm:
	@rm -f touchstone.wasm
	@$(MAKE) touchstone.wasm

clean:
	@rm -f ./*.log ./*.tmp touchstone.wasm
	@printf 'clean ok: removed temporary files and touchstone.wasm\n'

distclean: clean
	@printf 'distclean ok\n'

serve:
	./serve.sh

help:
	@printf 'Targets:\n'
	@printf '  make             build touchstone.wasm then run JS/WASM checks (default now rebuilds wasm)\n'
	@printf '  make clean       remove temporary files and touchstone.wasm\n'
	@printf '  make rebuild-wasm force rebuild of touchstone.wasm\n'
	@printf '  make distclean   same as clean\n'
	@printf '  make serve       run the local development server\n'
