// Inference: Check queue callbacks are executed after microtask queue callbacks, Timer queue callbacks and I/0 queue callbacks are executed

const fs = require('fs');

fs.readFile(__filename, () => {
  console.log('this is read file 1');
  setImmediate(() => {
    console.log('This is an inner set immediate inside readfile');
  });

  process.nextTick(() => console.log('This is readfiel nextick'));
  Promise.resolve().then(() => console.log('this is readfile promise'));
});

process.nextTick(() => console.log('This is process next log 1'));
Promise.resolve().then(() => console.log('Promise logs 1'));
setTimeout(() => {
  console.log('This is set timeout 1');
}, 0);
