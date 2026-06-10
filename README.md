> **Photosensitivity / epilepsy warning:** This project renders rapidly changing
> neon visuals, recursive feedback, flashes, and high-contrast motion. Do not use
> it if you are sensitive to flashing lights or motion-triggered visual effects.
> Stop immediately if you feel discomfort, dizziness, eye strain, nausea, or any
> seizure-related symptoms.

# Neon Recursion WebGL/WASM V10.5

Launch the Neon Recusion app (click this link): [https://def.s.gy/neon-recursion](https://def.s.gy/neon-recursion)

Expanded URL: [https://gptenv.github.io/neon_recursion/](https://gptenv.github.io/neon_recursion/)

Preview URL: [https://htmlpreview.github.io/?https://raw.githubusercontent.com/gptenv/neon_recursion/refs/heads/main/index.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/gptenv/neon_recursion/refs/heads/main/index.html)

Version: `webgl-wasm-v10.5-fullscreen-hud-hotfix-2026-06-10`

This is the browser-native WebGL/WASM Touchstone port with a Makefile fix for macOS/Homebrew environments where the default `clang` does **not** include a WebAssembly backend.

The package already includes a prebuilt `touchstone.wasm`. Normal use does not require rebuilding it.

## Run

Browsers require a secure context for camera/mic. `localhost` counts as secure:

```bash
./serve.sh
```

Then open:

```text
http://127.0.0.1:8787/
```

## GitHub Pages deploy

This repository is ready to deploy through GitHub Actions. Every push to the
`main` branch runs `.github/workflows/deploy-pages.yml`, verifies the static
bundle with `make`, stages `index.html`, `app.js`, `touchstone.wasm`, and
`assets/` when present, then publishes that artifact to GitHub Pages.

First-time push to a new GitHub repository:

```bash
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```

If GitHub asks for a Pages source, choose **GitHub Actions** in
`Settings -> Pages`. After that, normal `git push` updates the live Pages site.

## Safe make workflow

This now works even if your system `clang` cannot compile `--target=wasm32`:

```bash
make clean
make
```

`make clean` intentionally keeps the bundled `touchstone.wasm`.

Use this only when you actually want to rebuild the WASM module:

```bash
make rebuild-wasm
```

If that fails with “cannot compile --target=wasm32”, install a WASM-capable LLVM/clang, Emscripten, or WASI SDK. On macOS with Homebrew LLVM:

```bash
brew install llvm
export PATH="/opt/homebrew/opt/llvm/bin:$PATH"   # Apple Silicon
# or:
export PATH="/usr/local/opt/llvm/bin:$PATH"      # Intel Homebrew
make rebuild-wasm
```

`make distclean` removes the bundled `touchstone.wasm`; `make clean` does not.

## Controls

```text
1..9 / 0        activate preset within the current 10-preset bank
[ / ]           shift number-key bank without changing active preset
Left / Right    previous / next active preset
Horizontal swipe previous / next active preset
C               forge, save, append, bank-jump, and activate a new generated preset
Ctrl+N          nuke current generated preset only
F               toggle fullscreen and force HUD hidden
H               toggle HUD, including while fullscreen is active
Y               toggle Y-axis reflection / mirror mode, left-right flip; ON by default
X               toggle X-axis reflection / vertical flip; ON by default
Z               toggle Z-axis half-turn / 180-degree camera flip; OFF by default
R               clear recursive feedback buffer
Up / Down       intensity
, / .           feedback memory
- / =           camera blend
```

Generated presets remain saved in browser `localStorage` under the original v10 key for compatibility:

```text
neon_recursion_touchstone_v10_presets
```


## V10.5 fullscreen behaviour

`F` toggles browser fullscreen through the Fullscreen API. Pressing `F` also forces the HUD hidden; it does **not** toggle the HUD state. `H` remains independent and can bring the HUD back while fullscreen is active.
