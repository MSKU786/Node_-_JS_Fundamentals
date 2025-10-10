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
buf.write(text);
console.log(buf.toString());

/*
⚡ Step 3: What about unknown or large data (like paragraphs or files)?
*/
