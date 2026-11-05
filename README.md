# Symplectic Tether Sim — exact Navier–Stokes flows on T³

A mobile-friendly three.js visualization (25³ lattice clipped to a ball, gold→mauve palette, drag-to-orbit) whose
motion and on-screen numbers are **computed**, not decorative.

## What it shows
- **Flow:** particles advected (RK4, dt = 1/60) by an *exact* solution of the incompressible Navier–Stokes equations on the periodic torus T³ = [0,2π)³:
  - **ABC / Beltrami** (default, A=B=C=1): u = (A sin z + C cos y, B sin x + A cos z, C sin y + B cos x)·e^{−νt}. Here ∇×u = u, so (u·∇)u = ∇(|u|²/2) and the flow is exact with pressure p = −|u|²/2.
  - **Taylor–Green (2D-in-3D):** u = (sin x cos y, −cos x sin y, 0)·e^{−2νt}, p = ¼(cos 2x + cos 2y)·e^{−4νt}.
- **Color:** |ω| at each particle (exact vorticity), mauve = low, gold = high.
- **HUD (all computed live):** t, max|ω| on a 24³ grid, E = ½∫|u|², Z = ½∫|ω|², helicity H = ∫u·ω (numeric, with exact values beside them), the energy-identity residual dE/dt + 2νZ, max|∇·u|, and the vertex count (7,129 = points of the 25³ lattice inside the ball of radius π).
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
