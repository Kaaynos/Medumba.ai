const { Jimp } = require('jimp');
const path = require('path');

(async () => {
  const CANVAS = 1024;
  const PADDING = 0.33;
  const logoSize = Math.round(CANVAS * (1 - PADDING * 2));
  const offset = Math.round((CANVAS - logoSize) / 2);

  const src = await Jimp.read(path.join(__dirname, 'assets', 'icon.png'));
  src.resize({ w: logoSize, h: logoSize });

  const canvas = new Jimp({ width: CANVAS, height: CANVAS, color: 0xFFFFFFFF });
  canvas.composite(src, offset, offset);

  await canvas.write(path.join(__dirname, 'assets', 'adaptive-icon.png'));
  console.log(`Done — logo ${logoSize}px on ${CANVAS}px canvas`);
})();
