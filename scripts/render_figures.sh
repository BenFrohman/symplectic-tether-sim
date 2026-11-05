#!/usr/bin/env bash
# Render PNG figures + MP4 with headless Chrome (swiftshader) and ffmpeg.
set -e; cd "$(dirname "$0")/.."; C=${CHROME:-google-chrome}; F="--headless=new --no-sandbox --use-angle=swiftshader --enable-unsafe-swiftshader"
for t in 0 2 6; do $C $F --virtual-time-budget=6000 --window-size=1600,1200 --force-device-scale-factor=2 --screenshot=figures/abc_nu0.05_t$t.png "file://$PWD/index.html?mode=abc&nu=0.05&t=$t&fig=1"; done
$C $F --virtual-time-budget=6000 --window-size=1600,1200 --force-device-scale-factor=2 --screenshot=figures/tg_nu0.05_t4.png "file://$PWD/index.html?mode=tg&nu=0.05&t=4&fig=1"
mkdir -p /tmp/stframes; for i in $(seq 0 39); do t=$(python3 -c "print($i*0.15)"); $C $F --virtual-time-budget=4000 --window-size=1280,720 --screenshot=/tmp/stframes/f$(printf %03d $i).png "file://$PWD/index.html?mode=abc&nu=0.05&t=$t&fig=1"; done
ffmpeg -y -framerate 8 -i /tmp/stframes/f%03d.png -c:v libx264 -pix_fmt yuv420p figures/abc_nu0.05_t0-6.mp4
