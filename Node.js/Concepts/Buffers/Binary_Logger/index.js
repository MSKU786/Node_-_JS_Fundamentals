const fs = require('fs');

const readStream = fs.createReadStream('input.txt', {
  highWaterMark: 1 * 1024,
});

const buffers = [];

readStream.on('data', (chunk) => {
  console.log('Chunka byte length', chunk.length);
  //chunk = Buffer.from([255, 254, 0, 1]).toString('hex');

  // slice(0, 10) gets the first 10 bytes (or fewer if the chunk is small)
  const firstTenBytesHex = chunk.slice(0, 10).toString('hex');
  console.log('🔹 First 10 bytes (hex):', firstTenBytesHex);

  buffers.push(chunk);
});

readStream.on('end', () => {
  console.log('\n✅ File reading complete.');

  // 🧩 Combine all chunks into a single Buffer
  const totalBuffer = Buffer.concat(buffers);
  console.log('📏 Total combined buffer size:', totalBuffer.length, 'bytes');

  // Write the reconstructed file
  fs.writeFileSync('output_copy.txt', totalBuffer);
  console.log('💾 File reassembled and written as output_copy.txt');
});
