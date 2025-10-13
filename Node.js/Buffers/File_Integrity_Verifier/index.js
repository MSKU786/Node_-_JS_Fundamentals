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
  highWaterMark: 64 * 1024,
});

const buffers = [];
const hash = crypto.createHash('sha256').setEncoding('hex');
const fileSizeInKB = stats.size / 1024;
let i = 0;
readStream.on('data', (chunk) => {
  i++;
  console.log('Chunk :', i, chunk.length);
  console.log(`${(i * chunk.length) / fileSizeInKB}% file is processed`);
  hash.update(chunk);
  buffers.push(chunk);
});

readStream.on('end', () => {
  console.log('\n✅ File reading complete.');
  const totalBuffer = Buffer.concat(buffers);
  hash.digest('hex');
  console.log('Hash of input file', hash.read());
  console.log('Hashing complete for input file');
  fs.writeFileSync('output.txt', totalBuffer);
});
