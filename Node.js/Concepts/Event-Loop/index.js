/*

Timers
Pending Callbacks
Idle, Prepare (internal use)
Poll
Check
Close Callbacks

*/

const fs = require('fs');

setTimeout(() => console.log('1. setTimeout'), 0);
setImmediate(() => console.log('2. setImmediate'));

fs.readFile(__filename, () => {
  console.log('3. fs.readFile');
  setImmediate(() => console.log('4. inner setImmediate'));
  process.nextTick(() => console.log('5. inner nextTick'));
  Promise.resolve().then(() => console.log('6. inner Promise.then'));
});

process.nextTick(() => console.log('7. outer nextTick'));
Promise.resolve().then(() => console.log('8. outer Promise.then'));

/*
---------------------------------- Output -------------------------------------
7. outer nextTick
8. outer Promise.then
1. setTimeout
2. setImmediate
3. fs.readFile
5. inner nextTick
6. inner Promise.then
4. inner setImmediate

*/
