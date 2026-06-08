import Jimp from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the original adaptive-icon (logo on white background)
const src = await Jimp.read(path.join(__dirname, 'assets', 'adaptive-icon.png'));

const CANVAS = 1024;
const PADDING = 0.22; // 22% padding on each side → logo occupies 56% of canvas (safe zone)

const logoSize = Math.round(CANVAS * (1 - PADDING * 2));
src.resize(logoSize, logoSize, Jimp.RESIZE_LANCZOS3);

// White 1024×1024 canvas
const canvas = new Jimp(CANVAS, CANVAS, 0xFFFFFFFF);
const offset = Math.round((CANVAS - logoSize) / 2);
canvas.composite(src, offset, offset);

await canvas.writeAsync(path.join(__dirname, 'assets', 'adaptive-icon.png'));
console.log(`Done — logo ${logoSize}px centered on ${CANVAS}px white canvas`);
