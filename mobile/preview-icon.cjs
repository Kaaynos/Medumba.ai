const { Jimp } = require('jimp');
const path = require('path');

(async () => {
  const SIZE = 200;

  // Load and resize adaptive icon
  const icon = await Jimp.read(path.join(__dirname, 'assets', 'adaptive-icon.png'));
  icon.resize({ w: SIZE, h: SIZE });

  // Create circular mask: pixels outside the circle → transparent
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const cx = x - SIZE / 2, cy = y - SIZE / 2;
      if (cx * cx + cy * cy > (SIZE / 2) * (SIZE / 2)) {
        icon.setPixelColor(0x00000000, x, y);
      }
    }
  }

  // Place on a light-grey background (like an Android home screen)
  const bg = new Jimp({ width: SIZE + 40, height: SIZE + 60, color: 0xEEEEEEFF });
  bg.composite(icon, 20, 10);

  // Add label area (grey bar at bottom simulating app name)
  for (let y = SIZE + 14; y < SIZE + 54; y++)
    for (let x = 20; x < SIZE + 20; x++)
      bg.setPixelColor(0xEEEEEEFF, x, y);

  await bg.write(path.join(__dirname, 'assets', 'icon-preview.png'));
  console.log('Preview saved to assets/icon-preview.png');
})();
