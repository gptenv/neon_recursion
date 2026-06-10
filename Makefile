# Neon Recursion WebGL/WASM V10.1 Makefile
#
# The release tarball ships with a prebuilt touchstone.wasm.  Normal users do
# not need a wasm-capable compiler, and `make clean && make` must keep working
# on Apple/system clang builds that do not include the wasm32 backend.

WASM_CC ?= clang
WASM_CFLAGS ?= --target=wasm32 -O3 -nostdlib -fvisibility=hidden
WASM_LDFLAGS ?= -Wl,--no-entry -Wl,--export=touchstone_version -Wl,--export=recipe_word -Wl,--export=recipe_family -Wl,--strip-all

.PHONY: all check clean distclean wasm rebuild-wasm serve help

all: check

check: touchstone.wasm
	@node --check app.js
	@node tools/check_wasm.mjs
	@printf 'check ok: bundled touchstone.wasm is present and usable\n'

# Intentionally no src/touchstone.c prerequisite here.  If the bundled wasm
# exists, make should use it as an artifact, not rebuild it by accident.
touchstone.wasm:
	@printf 'error: touchstone.wasm is missing.\n' >&2
	@printf 'The release archive normally includes it. Re-extract the tarball, or run:\n' >&2
	@printf '  make rebuild-wasm\n' >&2
	@printf 'after installing a clang/LLVM build with wasm32 support, Emscripten, or WASI SDK.\n' >&2
	@exit 1

wasm: rebuild-wasm

rebuild-wasm:
	@tmp="$$(mktemp -t neon-wasm-check-XXXXXX).o"; \
	trap 'rm -f "$$tmp"' EXIT; \
	printf 'int x;\n' | $(WASM_CC) --target=wasm32 -x c -c -o "$$tmp" - >/dev/null 2>&1 || { \
		printf 'error: %s cannot compile --target=wasm32 on this machine.\n' '$(WASM_CC)' >&2; \
		printf 'Apple/system clang often lacks the WebAssembly backend.\n' >&2; \
		printf 'Use the bundled touchstone.wasm, or install one of these and retry:\n' >&2; \
		printf '  brew install llvm\n' >&2; \
		printf '  export PATH="/opt/homebrew/opt/llvm/bin:$$PATH"   # Apple Silicon\n' >&2; \
		printf '  export PATH="/usr/local/opt/llvm/bin:$$PATH"      # Intel Homebrew\n' >&2; \
		printf 'or use Emscripten/WASI SDK and set WASM_CC accordingly.\n' >&2; \
		exit 1; \
	}; \
	$(WASM_CC) $(WASM_CFLAGS) $(WASM_LDFLAGS) src/touchstone.c -o touchstone.wasm
	@printf 'rebuilt touchstone.wasm\n'

clean:
	@rm -f ./*.log ./*.tmp
	@printf 'clean ok: kept bundled touchstone.wasm. Use make distclean to remove it.\n'

distclean: clean
	@rm -f touchstone.wasm
	@printf 'distclean ok: removed touchstone.wasm\n'

serve:
	./serve.sh

help:
	@printf 'Targets:\n'
	@printf '  make             run JS/WASM sanity checks using bundled touchstone.wasm\n'
	@printf '  make clean       remove temporary files; keep bundled touchstone.wasm\n'
	@printf '  make rebuild-wasm rebuild touchstone.wasm if your compiler supports wasm32\n'
	@printf '  make distclean   remove temporary files and touchstone.wasm\n'
	@printf '  make serve       run the local development server\n'
