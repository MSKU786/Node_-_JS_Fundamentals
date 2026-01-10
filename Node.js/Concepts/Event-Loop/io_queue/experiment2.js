const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('this is read file 1');
});

// process.nextTick(() => console.log('This is process next log 1'));
// Promise.resolve().then(() => console.log('Promise logs 1'));
setTimeout(() => {
  console.log('This is set timeout 1');
}, 0);

//INference

// when running setTImeout with delay of 0 ms and I/O async method, the order of execution never be guranteed
