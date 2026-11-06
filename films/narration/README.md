# Film narration (local deliverable — not published)

Spoken commentary and captions for the three watermarked website films, plus a local-only fourth. **Nothing here has been pushed or deployed.** The silent watermarked originals are unchanged byte-for-byte.

## Voice

- Engine: Microsoft Edge neural TTS via the public `edge-tts` Python package (`en-US-AndrewNeural`, rate −5%).
- Not a voice clone of any person. Not a chat voice memo.
- Audio peaks ≈ −2.5 to −3.5 dBFS (no clipping). Mono AAC 128 kb/s, 48 kHz.

## Films

| Narrated MP4 | Duration | Script | Captions |
|---|---|---|---|
| `../01_inside_the_torus_abc_watermarked_narrated.mp4` | 30 s | `01_abc.txt` / `scripts.json` | `01_abc.vtt` `.srt` (+ soft `mov_text` in MP4) |
| `../02_taylor_green_cells_watermarked_narrated.mp4` | 20 s | `02_tg.txt` | `02_tg.vtt` `.srt` |
| `../03_p2q_kernel_jumps_watermarked_narrated.mp4` | 25 s | `03_p2q_art.txt` | `03_p2q_art.vtt` `.srt` |
| `/workspace/p2q-mk1-viz/films/p2q_mk1_exact_v2_narrated.mp4` | 30 s | that tree's `narration/04_mk1.txt` | local only — **do not publish without new approval** |

Sidecar `.vtt`/`.srt` also sit next to each `*_narrated.mp4`. Soft captions are embedded as `mov_text` (player-toggleable). No hard-burned captions (keeps HUD clear). Website should keep `autoplay` muted / no autoplay audio if these are later published.

## Precision notes baked into the scripts

- Tracers move in **exact special** Navier–Stokes solutions (ABC / Taylor–Green), not a general solver.
- Vortex lines = integral curves of vorticity (spin direction).
- Viscosity reduces kinetic energy; HUD compares grid E to the exact formula.
- Films do **not** claim the Clay / general 3-D regularity problem is solved.
- Artistic P2Q film: violet arcs **illustrate transitions**; the film **does not calculate quantum-jump dynamics**; on-screen numbers are fluid math.
- Local fourth: left panel = sourced P2Q integer arithmetic; right = MK-1 probabilities **computed classically** (no quantum hardware).

## Rebuild

```
python3 -m venv /tmp/ttsvenv && /tmp/ttsvenv/bin/pip install edge-tts
# then the synth/mux steps used in this session (edge-tts → wav → ffmpeg mux -c:v copy)
```
