> **Photosensitivity / epilepsy warning:** This project renders rapidly changing
> neon visuals, recursive feedback, flashes, and high-contrast motion. Do not use
> it if you are sensitive to flashing lights or motion-triggered visual effects.
> Stop immediately if you feel discomfort, dizziness, eye strain, nausea, or any
> seizure-related symptoms.

# Neon Recursion WebGL/WASM V10.8

Launch the Neon Recusion app (click this link): [https://def.s.gy/neon-recursion](https://def.s.gy/neon-recursion)

Expanded URL: [https://gptenv.github.io/neon_recursion/](https://gptenv.github.io/neon_recursion/)

Preview URL: [https://htmlpreview.github.io/?https://raw.githubusercontent.com/gptenv/neon_recursion/refs/heads/main/index.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/gptenv/neon_recursion/refs/heads/main/index.html)

Version: `webgl-wasm-v10.8-2026-06-stripefix-reactive`

This is the browser-native WebGL/WASM Touchstone port. The Makefile builds `touchstone.wasm`, so use a wasm32-capable clang such as Homebrew LLVM on macOS.

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

The app is expected to build from source. On this machine, source the shell profile first so Homebrew LLVM is on PATH:

```bash
source ~/.profile
make clean
make
```

`make clean` removes `touchstone.wasm`; `make` rebuilds it from `src/touchstone.c` and validates the bundle. Use this when you explicitly want to force just the WASM target:

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

`make distclean` currently behaves the same as `make clean`.

## Controls

```text
1..9 / 0        activate preset within the current 10-preset bank
[ / ]           shift number-key bank without changing active preset
Left / Right    previous / next active preset
Horizontal swipe previous / next active preset
C / click / tap forge, save, append, bank-jump, and activate a new generated preset
Double-click /
double-tap /
Space           force fullscreen, hide HUD, and toggle MP4/H.264 recording + download
                with mic plus shared system/tab audio when available
Ctrl+N          nuke current generated preset only
F               toggle fullscreen and force HUD hidden
H               toggle HUD, including while fullscreen is active
Y               toggle Y-axis reflection / mirror mode, left-right flip; ON by default
X               toggle X-axis reflection / vertical flip; ON by default
Z               toggle Z-axis half-turn / 180-degree camera flip; OFF by default
R               clear recursive feedback buffer
Up / Down       reseed randomizers (change live seed offset for baked + forged presets)
Vertical swipe
and hold        continuously change the randomizer seed offset
, / .           feedback memory
- / =           adjust drive (warping, colour, depth, reactions)
```

Generated presets remain saved in browser `localStorage` under the original v10 key for compatibility:

```text
neon_recursion_touchstone_v107_presets
```


## V10.8 layered reactive engine

V10.8 uses a 24-value recipe schema. The random forger drives layered underlays, camera-feed displacement, previous-frame displacement, overlay masks, chromatic splitting, pseudo-alpha compositing, depth/parallax fields, palette behaviour, and audio/video reaction weighting. The shader keeps the readable V10 camera structure while restoring saturated recursive contrast, brighter colour cycling, stronger feedback displacement, and visible audio/video motion. Recipes select distinct audio reaction lanes, motion lanes, composition modes, color transforms, mask reactions, warp personalities, and feedback personalities. The 200 baked presets are regenerated through a mixed family/behavior recipe permutation so adjacent number-key slots produce more distinct looks.

V10.8 reworks the reactivity logic (richer body/air/beat/groove/detail drives, stronger onset/flux/groove response) and all 20 field families + lane behaviors for significantly more interesting, varied visuals. Diagonal stripe artifacts (the previous accidental interlacing-like x+y patterns) are gated behind an explicit stripe personality lane. The 200 baked + future forged presets use refreshed composition, color, mask, motion, feedback, and warp lanes so only explicit lens/warp personalities bend the camera layer heavily; other presets react through recolor, edge masks, block/poster changes, beat cutouts, feedback echo, contour bloom, and palette mutation.

The `-` and `=` keys adjust visual drive (warp amplitude, colour pressure, feedback behaviour, depth, overlay intensity, and audio/video reaction gain). Drive has a broad range (0..6).

The Up/Down keys and vertical swipe-hold change the live randomizer seed offset. The offset reseeds baked and generated recipes in place and also feeds future forged presets. New forged presets still use browser entropy and are chosen from multiple random candidates biased toward recipe-lane distance from existing presets. Holding or swiping vertically scrubs the seed offset continuously for live auditioning of variations.

## Fullscreen and recording behaviour

`F` toggles browser fullscreen through the Fullscreen API. Pressing `F` also forces the HUD hidden; it does **not** toggle the HUD state. `H` remains independent and can bring the HUD back while fullscreen is active.

Double-click, double-tap, and Space always request fullscreen, force the HUD hidden, and then toggle canvas recording. Starting uses MediaRecorder MP4/H.264 support when the browser exposes it; stopping downloads the completed `.mp4` and revokes the generated object URL after the download has been initiated, with any remaining URLs revoked on page unload.

Recordings wait for fresh fullscreen-sized app frames before MediaRecorder is created, then copy each rendered WebGL frame into a stable offscreen recording canvas and request capture frames from that canvas. This avoids recording directly from Chrome/macOS's fullscreen canvas compositor path, which can produce recordings that play for the full duration while showing only the first captured frame.

Audio reactivity and recording audio use one Web Audio mix of microphone input plus the browser-provided shared system/tab audio track. Browsers do not expose raw speaker output directly to pages; choose a screen, window, or tab and enable audio sharing in the browser picker when starting the app. Browser and OS support varies: when shared system/tab audio is unavailable or not granted, the app continues with mic audio or synthetic fallback.
