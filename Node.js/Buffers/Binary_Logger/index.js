const fs = require('fs');

const readStream = fs.createReadStream('input.txt', {
  highWaterMark: 1 * 1024,
});

let buff = [];
readStream.on('data', (chunk) => {
  console.log('Chunka byte length', chunks.length());
  chunk = Buffer.from([255, 254, 0, 1]).toString('hex');
  buff.push(chunk);
});

const totalBuff = Buffer.concat(buff);
