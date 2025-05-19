const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('this is read file 1');
});

process.nextTick(() => console.log('This is process next log 1'));
Promise.resolve().then(() => console.log('Promise logs 1'));
