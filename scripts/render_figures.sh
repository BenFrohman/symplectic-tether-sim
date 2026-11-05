#!/usr/bin/env bash
# Render PNG figures + MP4 with headless Chrome (swiftshader) and ffmpeg.
set -e; cd "$(dirname "$0")/.."; C=${CHROME:-google-chrome}; F="--headless=new --no-sandbox --use-angle=swiftshader --enable-unsafe-swiftshader"
for t in 0 2 6 30; do $C $F --virtual-time-budget=6000 --window-size=1600,1200 --force-device-scale-factor=2 --screenshot=figures/abc_nu0.05_t$t.png "file://$PWD/index.html?mode=abc&nu=0.05&t=$t&fig=1"; done
$C $F --virtual-time-budget=6000 --window-size=1600,1200 --force-device-scale-factor=2 --screenshot=figures/tg_nu0.05_t4.png "file://$PWD/index.html?mode=tg&nu=0.05&t=4&fig=1"
NODE_PATH=${NODE_PATH:-node_modules} node scripts/record.js abc 0.05 30 240 /tmp/rec && ffmpeg -y -framerate 10 -i /tmp/rec/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 20 figures/abc_nu0.05_t0-30_vortexlines.mp4
