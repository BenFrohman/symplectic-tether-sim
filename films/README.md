# Films: Symplectic Tether, "inside the box"

These are three 1080p/30 fps films rendered from `film.html` with `render.js` (headless Chrome, three.js 0.160 with bloom).

| file | length | content |
|---|---|---|
| `01_inside_the_torus_abc.mp4` | 30 s | ABC/Beltrami flow (A=B=C=1, ν=0.05), t = 0 → 30. The camera flies into and through 3×3×3 periodic copies of T³. |
| `02_taylor_green_cells.mp4` | 20 s | 2D-in-3D Taylor–Green flow (ν=0.05), t = 0 → 20. A crane move over 2×2 periodic copies of the vortex columns. |
| `03_p2q_kernel_jumps.mp4` | 25 s | The ABC flow (ν=0.05, t = 0 → 25) drawn in a phase-space torus view, with the **speculative** P2Q hop layer on top. |

Stills from each film are in `stills/`. Per-film diagnostics, sampled every 150 frames, are in `diag_*.json`.

## What is real

- **Velocity fields**: both are closed-form exact solutions of incompressible Navier–Stokes on T³ = [0,2π)³ (`../src/physics.js`).
- **Particles**: 15,625 particles from the full 25³ lattice, advected with RK4 (dt = 1/60) in the exact velocity field. They are coloured by |ω| at each particle, normalised per frame.
- **Vortex lines**: 40 integral curves of ω, traced with RK4 in arclength.
- **Periodic copies**: the copies in films 01 and 02 are exact, because the flow is 2π-periodic.
- **HUD and ribbon numbers**: these are recomputed every frame.
  - E, Z and H come from a 24³ grid with 6th-order finite differences, shown next to the exact values.
  - The energy identity is checked through dE/dt + 2νZ, with dE/dt taken by central difference.
  - The HUD also shows max|∇·u|.
  - The energy ribbon plots the grid E values as dots on top of the exact E(t) curve. The strip underneath shows log₁₀|dE/dt + 2νZ|.
- **Measured over every frame of all three films**: the worst relative residual is about 4.5e‑6, and max|∇·u| is ≤ 4e‑15 (see `diag_*.json`).

## What is speculative or artistic

- **The P2Q layer in film 03.** The violet arcs are discrete "kernel hops" from deterministically chosen particles to the nearest node of a 12×6 lattice on the torus.
  - They are decorative and inspired by the P2Q research aesthetic.
  - They do **not** move the particles or change any number on screen.
  - They are **not** physical quantum dynamics, **not** a quantum Navier–Stokes model and **not** a claim about the Clay Navier–Stokes problem.
- **The phase-space torus in film 03** is a visual embedding only: the x and y angles map to a donut, and z sets the tube "breathing".
- **The look**: camera paths, bloom, fog and colour maps are cinematography.

These films show one explicit smooth flow each. They demonstrate the energy identity for those flows only. They prove nothing about general 3D regularity.

## Reproduce

```
NODE_PATH=<dir with playwright or playwright-core> CHROME=/usr/bin/google-chrome \
  node films/render.js abc 900 30 /tmp/fr_abc     # also: tg 600 20, p2q 750 25
ffmpeg -framerate 30 -i /tmp/fr_abc/f%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 19 -preset slow films/01_inside_the_torus_abc.mp4
```
