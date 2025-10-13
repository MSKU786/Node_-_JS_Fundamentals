/*
🧩 Project Task: “File Integrity Verifier”
🎯 Goal

Build a Node.js script that:

Reads any file in binary chunks (using buffers).

Calculates a hash (checksum) as it reads (like MD5 or SHA256).

Writes the same data to a new output file.

Once complete, verifies that the original file and output file have identical hashes — proving your buffer handling was perfect.

*/

const fs = require('fs');
const crypto = require('crypto');

const stats = fs.statSync('input.txt');

const readStream = fs.createReadStream('input.txt', {
  highWaterMark: 12 * 1024,
});

const buffers = [];
const hash = crypto.createHash('sha256');
const totalBytes = stats.size;
let bytesRead = 0;

readStream.on('data', (chunk) => {
  bytesRead += chunk.length;
  const percent = ((bytesRead / totalBytes) * 100).toFixed(2);
  console.log(`📦 Chunk size: ${chunk.length} bytes`);
  console.log(`📊 Progress: ${percent}%`);
  hash.update(chunk);
  buffers.push(chunk);
});

readStream.on('end', async () => {
  console.log('\n✅ File reading complete.');
  const totalBuffer = Buffer.concat(buffers);
  const inputHash = hash.digest('hex');
  console.log('🔹 Input file hash:', inputHash);

  fs.writeFileSync('output.txt', totalBuffer);
  console.log('💾 File reassembled as output.txt');

  const outputHash = await calculateFileHash('output.txt');
  console.log('\n🔹 Input file hash :', inputHash);
  console.log('🔹 Output file hash:', outputHash);

  if (inputHash === outputHash) {
    console.log('✅ Hashes match! File integrity verified.');
  } else {
    console.log('❌ Hash mismatch! Something went wrong.');
  }
});

readStream.on('error', (err) => console.error('❌ Error:', err));

function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}
