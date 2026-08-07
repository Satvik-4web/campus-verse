const Jimp = require('jimp');

async function processImage() {
  try {
    const image = await Jimp.read('public/thapar-logo.png');
    
    // Convert white background to transparent
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      
      // Calculate how close the pixel is to pure white (255)
      const avg = (r + g + b) / 3;
      
      // If the pixel is very bright (close to white), we make it transparent.
      // We use a smooth transition for anti-aliased edges.
      if (avg > 200) {
        // If it's pure white, alpha becomes 0.
        // If it's 200, alpha remains 255.
        // alpha = 255 - ((avg - 200) / 55) * 255
        const newAlpha = 255 - ((avg - 200) / 55) * 255;
        this.bitmap.data[idx + 3] = newAlpha;
      }
    });
    
    await image.writeAsync('public/thapar-logo-transparent.png');
    console.log('Successfully processed image!');
  } catch (err) {
    console.error(err);
  }
}

processImage();
