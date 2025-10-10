/*
A Buffer in Node.js is a special memory space (outside the V8 JavaScript engine) used to handle binary data — raw data that isn’t necessarily text (like images, files, videos, or network packets).

It’s part of Node’s core modules (Buffer is a global object, no import needed).
*/

// Create a Buffer from the string 'Hello World' using UTF-8 encoding
let buf = Buffer.from('Hello World', 'utf-8');

// Display the raw buffer as a Uint8Array (shows byte values)
console.log(buf);

// Convert buffer back to a readable string using UTF-8 encoding
console.log(buf.toString('utf-8'));

// Get the length of the buffer in bytes (11 bytes for 'Hello World')
console.log(buf.length);

// Convert buffer to a JSON object showing the byte array
console.log(buf.toJSON());

// Write 'Hello World' to the buffer and return number of bytes written
console.log(buf.write('Hello World', 'utf-8'));

// Read first byte as an unsigned 8-bit integer (value of 'H' = 72)
console.log(buf.readUInt8(0));

// Read first 2 bytes as unsigned 16-bit integer in Little Endian format
console.log(buf.readUInt16LE(0));

// Read first 4 bytes as unsigned 32-bit integer in Little Endian format
console.log(buf.readUInt32LE(0));

// Read first byte again as unsigned 8-bit integer (same as line 14)
console.log(buf.readUInt8(0));

// Read first 2 bytes again as unsigned 16-bit integer in Little Endian (same as line 15)
console.log(buf.readUInt16LE(0));

/* 
------------------------------------------------------------------------

Writing to a buffer manually

------------------------------------------------------------------------

*/
