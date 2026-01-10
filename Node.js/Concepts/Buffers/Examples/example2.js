const fs = require('fs');

// Example 2: Writing to a Buffer Manually

// Allocated 10 size of memonry which intialize with zeros
const buff = Buffer.alloc(50);
console.log(buff);

buff.write('Hi My name is Manish');
console.log(buff);

/* 
How to know a required buffer size
*/

const text = 'Hello Manish! This is a long message.';
console.log(Buffer.byteLength(text, 'utf8')); // number of bytes needed

const size = Buffer.byteLength(text, 'utf8');
const buff2 = Buffer.alloc(size);
buff2.write(text);
console.log(buff2.toString());

/*
⚡ Step 3: What about unknown or large data (like paragraphs or files)?

If the data is too large to fit into memory at once, you should not try to allocate a single buffer big enough.
Instead, Node.js solves this problem using streams, which internally manage buffers in chunks.
*/

const readStream = fs.createReadStream('bigFile.txt', {
  highWaterMark: 1 * 1024,
}); // 1KB Chunks

readStream.on('data', (chunk) => {
  console.log('chunk size', chunk.length);
  console.log(chunk);
});
