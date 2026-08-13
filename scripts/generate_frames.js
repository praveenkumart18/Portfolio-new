/* global process */
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const TOTAL_FRAMES = 24;
const WIDTH = 640;
const HEIGHT = 400;

// Off-white / light cream background matching user images (#e4e0d9)
const BG_R = 228;
const BG_G = 224;
const BG_B = 217;

// PK Handwriting curve control points
const PATH_POINTS = [
  // Intro curve into 'p'
  { x: 70, y: 190 },
  { x: 110, y: 195 },
  { x: 140, y: 185 },
  { x: 160, y: 160 },
  // Stem of 'p' going down
  { x: 145, y: 210 },
  { x: 130, y: 270 },
  { x: 115, y: 330 },
  // Loop back up for bowl of 'p'
  { x: 135, y: 250 },
  { x: 160, y: 175 },
  { x: 190, y: 150 },
  { x: 215, y: 170 },
  { x: 205, y: 200 },
  { x: 175, y: 210 },
  // Connection to 'k'
  { x: 210, y: 190 },
  { x: 245, y: 150 },
  // Loop up for tall stem of 'k'
  { x: 270, y: 90 },
  { x: 285, y: 35 },
  { x: 280, y: 20 },
  { x: 260, y: 50 },
  { x: 245, y: 120 },
  { x: 235, y: 190 },
  { x: 228, y: 245 },
  // 'k' center loop and flourish
  { x: 250, y: 180 },
  { x: 275, y: 175 },
  { x: 265, y: 205 },
  { x: 248, y: 220 },
  { x: 270, y: 235 },
  { x: 305, y: 250 },
  { x: 350, y: 240 },
  { x: 390, y: 210 }
];

// Helper to interpolate smooth Catmull-Rom or Bezier path
function getInterpolatedPath(t) {
  const maxIdx = PATH_POINTS.length - 1;
  const currPos = t * maxIdx;
  const idx = Math.floor(currPos);
  const frac = currPos - idx;

  if (idx >= maxIdx) return PATH_POINTS[maxIdx];

  const p0 = PATH_POINTS[Math.max(0, idx - 1)];
  const p1 = PATH_POINTS[idx];
  const p2 = PATH_POINTS[Math.min(maxIdx, idx + 1)];
  const p3 = PATH_POINTS[Math.min(maxIdx, idx + 2)];

  // Catmull-Rom spline
  const x = 0.5 * (
    (2 * p1.x) +
    (-p0.x + p2.x) * frac +
    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * frac * frac +
    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * frac * frac * frac
  );

  const y = 0.5 * (
    (2 * p1.y) +
    (-p0.y + p2.y) * frac +
    (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * frac * frac +
    (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * frac * frac * frac
  );

  return { x, y };
}

// Generate high-density sample points along the signature
const SAMPLES = 600;
const sampledPoints = [];
for (let i = 0; i <= SAMPLES; i++) {
  sampledPoints.push(getInterpolatedPath(i / SAMPLES));
}

function renderFrame(frameNum, totalFrames) {
  const png = new PNG({ width: WIDTH, height: HEIGHT });

  // Fill background
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const idx = (WIDTH * y + x) << 2;
      png.data[idx] = BG_R;
      png.data[idx + 1] = BG_G;
      png.data[idx + 2] = BG_B;
      png.data[idx + 3] = 255;
    }
  }

  const progress = frameNum / totalFrames;
  const visibleCount = Math.floor(progress * SAMPLES);
  if (visibleCount <= 0) return png;

  const tipPoint = sampledPoints[Math.min(visibleCount, SAMPLES - 1)];

  // Draw black stroke up to visibleCount
  const strokeRadius = 4.5;
  for (let i = 0; i < visibleCount; i++) {
    const pt = sampledPoints[i];
    const minX = Math.max(0, Math.floor(pt.x - strokeRadius - 1));
    const maxX = Math.min(WIDTH - 1, Math.ceil(pt.x + strokeRadius + 1));
    const minY = Math.max(0, Math.floor(pt.y - strokeRadius - 1));
    const maxY = Math.min(HEIGHT - 1, Math.ceil(pt.y + strokeRadius + 1));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dist = Math.hypot(x - pt.x, y - pt.y);
        if (dist <= strokeRadius) {
          const idx = (WIDTH * y + x) << 2;
          const alpha = dist > strokeRadius - 1 ? (strokeRadius - dist) : 1.0;
          // Blend dark stroke (#121212)
          png.data[idx] = Math.round(png.data[idx] * (1 - alpha) + 18 * alpha);
          png.data[idx + 1] = Math.round(png.data[idx + 1] * (1 - alpha) + 18 * alpha);
          png.data[idx + 2] = Math.round(png.data[idx + 2] * (1 - alpha) + 18 * alpha);
        }
      }
    }
  }

  // Draw bright pen-tip glow at the active drawing tip
  const glowRadius = 18;
  const gx = Math.round(tipPoint.x);
  const gy = Math.round(tipPoint.y);

  const minGx = Math.max(0, gx - glowRadius);
  const maxGx = Math.min(WIDTH - 1, gx + glowRadius);
  const minGy = Math.max(0, gy - glowRadius);
  const maxGy = Math.min(HEIGHT - 1, gy + glowRadius);

  for (let y = minGy; y <= maxGy; y++) {
    for (let x = minGx; x <= maxGx; x++) {
      const dist = Math.hypot(x - tipPoint.x, y - tipPoint.y);
      if (dist <= glowRadius) {
        const idx = (WIDTH * y + x) << 2;
        const intensity = Math.pow(1 - dist / glowRadius, 2) * 0.85;

        // Radial white-cyan glow effect
        png.data[idx] = Math.min(255, Math.round(png.data[idx] + 255 * intensity));
        png.data[idx + 1] = Math.min(255, Math.round(png.data[idx + 1] + 250 * intensity));
        png.data[idx + 2] = Math.min(255, Math.round(png.data[idx + 2] + 255 * intensity));
      }
    }
  }

  return png;
}

// Ensure output directories exist
const dir1 = path.join(process.cwd(), 'public', 'assets', 'pk-loader');
const dir2 = path.join(process.cwd(), 'public', 'loader-frames');

fs.mkdirSync(dir1, { recursive: true });
fs.mkdirSync(dir2, { recursive: true });

console.log('Generating 24 PK handwriting animation frames...');

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const padded = String(i).padStart(3, '0');
  const filename = `ezgif-frame-${padded}.png`;
  const png = renderFrame(i, TOTAL_FRAMES);
  const buffer = PNG.sync.write(png);

  fs.writeFileSync(path.join(dir1, filename), buffer);
  fs.writeFileSync(path.join(dir2, filename), buffer);
}

console.log('Successfully generated all 24 frames in public/assets/pk-loader and public/loader-frames!');
