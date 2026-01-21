const express = require('express');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const app = express();
const { Jimp } = require('jimp');

async function convertImageToBlackAndWhite(imagePath, outputPath) {
  try {
    // Read the existing image
    const image = await Jimp.read(imagePath);

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        const r = this.bitmap.data[idx];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        const totalBrightness = r + g + b;

        const value = totalBrightness > 220 ? 255 : 0;

        this.bitmap.data[idx] = value;
        this.bitmap.data[idx + 1] = value;
        this.bitmap.data[idx + 2] = value;
      },
    );
    // Save the new black and white image

    const writeResult = await image.write(outputPath); // Use writeAsync for Promise-based flow

    await extractText(outputPath);

    console.log(
      "Image successfully converted to black and white and saved as 'output-black-white.jpg'",
    );
  } catch (error) {
    console.error(error);
  }
}

const PORT = 3000;

async function preprocessImage(inputPath) {
  const outputPath = inputPath;
}

async function extractText(imagePath) {
  const result = await Tesseract.recognize(imagePath, 'eng', {
    tessedit_char_whitelist: '0123456789',
  });

  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, 'eng');

  const numbers = text.match(/\d+/g);
  console.log(numbers);
  console.log(result.data.text);
}

const inputPath = path.join(__dirname, 'static', 'image', '3.jpeg');
const outputPath = path.join(
  __dirname,
  'static',
  'image',
  'processed',
  '1-bw.jpeg',
);
convertImageToBlackAndWhite(inputPath, outputPath);

// app.listen(PORT, () => {
//   console.log('Server Listening on port ', PORT);
// });
