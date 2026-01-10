const fs = require('fs');

/*
This creates a Readable Stream from the file input.txt.
'utf8' tells Node to decode the file data into human-readable text instead of raw binary.
*/
const readStream = fs.createReadStream('input.txt', 'utf8');

//This creates a Writable Stream that can write data into output.txt.
const writeStream = fs.createWriteStream('output.txt');

/*
The .pipe() method connects a readable stream to a writable stream.
Whatever data readStream produces (from input.txt) will be automatically fed into writeStream
*/
readStream.pipe(writeStream);

/*
This attaches an event listener to the 'data' event emitted by the readable stream.
Every time Node reads a chunk from input.txt, it emits a 'data' event.
The callback function receives that chunk.
chunk is usually a Buffer object (binary data) unless you specify 'utf8', which converts it to a string.
*/
readStream.on('data', (chunk) => {
  console.log(chunk.toString());
  console.log('--------------------------------');
});
