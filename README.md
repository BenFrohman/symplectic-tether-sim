# Symplectic Tether Sim — exact Navier–Stokes flows on T³

A mobile-friendly three.js visualization (full 25³ = 15,625-particle lattice filling one period cube [0,2π]³ at t=0, gold→mauve palette, drag-to-orbit) whose
motion and on-screen numbers are **computed**, not decorative.

## What it shows
- **Flow:** particles advected (RK4, dt = 1/60) by an *exact* solution of the incompressible Navier–Stokes equations on the periodic torus T³ = [0,2π)³:
  - **ABC / Beltrami** (default, A=B=C=1): u = (A sin z + C cos y, B sin x + A cos z, C sin y + B cos x)·e^{−νt}. Here ∇×u = u, so (u·∇)u = ∇(|u|²/2) and the flow is exact with pressure p = −|u|²/2.
  - **Taylor–Green (2D-in-3D):** u = (sin x cos y, −cos x sin y, 0)·e^{−2νt}, p = ¼(cos 2x + cos 2y)·e^{−4νt}.
- **Color:** |ω| at each particle (exact vorticity), mauve = low, gold = high.
- **HUD (all computed live):** t, max|ω| on a 24³ grid, E = ½∫|u|², Z = ½∫|ω|², helicity H = ∫u·ω (numeric, with exact values beside them), the energy-identity residual dE/dt + 2νZ, max|∇·u|, and the vertex count (15,625 = the full 25³ lattice).
  Grid derivatives use 6th-order periodic central differences; dE/dt uses a central time difference (δt = 1e−3).
- **Status line:** says "E DECREASING" only if the computed dE/dt < 0, and "energy identity VERIFIED" only if |dE/dt + 2νZ| / |dE/dt| < 1e−3.

Exact values: ABC — E = Z = 4π³(A²+B²+C²)e^{−2νt}, H = 2E. Taylor–Green — E = 2π³e^{−4νt}, Z = 2E, H = 0.

## What it does **not** show
These are explicit special solutions. They say nothing about global regularity of general 3D Navier–Stokes data and are not a proof about the Clay Millennium problem. RK4 is not an exactly volume-preserving or symplectic integrator; the *field* is exactly divergence-free. The particle cloud is drawn unwrapped (not folded back into the torus), so it spreads over time.

## Run
Open `index.html` in a browser (three.js loads from unpkg). URL options: `?mode=abc|tg&nu=0.05&t=2&fig=1` (fig: jump to time t, freeze, hide controls — used for figures).

## Test
`node test/physics.test.js` — compares grid E, Z, H, dE/dt with exact values; checks the residual and divergence.

## Figures
`figures/` — PNG renders at several times and a short MP4 (ABC, ν = 0.05), produced with headless Chrome.

## Author / license
Benjamin Stanley Frohman (ORCID 0009-0006-7068-3718). Apache-2.0 — see LICENSE and NOTICE.

## Vortex lines, long runs, recording

- **Vortex lines** (on by default): 40 integral curves of ω, traced with RK4 in arclength (260 steps of 0.06) and coloured cold→hot by |ω|. For ABC, ω = u, so the vortex lines are also streamlines. For Taylor–Green, ω is along z, so the lines are straight and vertical.
- **Long runs**: speed slider (×1–10), t_max of 30/60/120/∞ (default 60), and a loop checkbox. Particles are drawn wrapped into one period cell, [0,2π)³.
- **Recording**: `NODE_PATH=<playwright node_modules> node scripts/record.js abc 0.05 30 240 /tmp/rec` writes 241 frames for t = 0..30. `scripts/render_figures.sh` encodes them into `figures/abc_nu0.05_t0-30_vortexlines.mp4` (24 s at 10 fps).
- Verified run (ABC, ν = 0.05, t = 0..30): n = 15,625 throughout, max|∇·u| = 0, and the energy identity residual stays at about 4.5e-6 relative. E(30) = 18.52454, matching the exact value.

## Films

The cinematic 1080p films are in [`films/`](films/). See `films/README.md` for which parts are exact math and which are the speculative P2Q art layer.
