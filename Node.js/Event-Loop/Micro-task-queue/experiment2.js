console.log('console log 1');

process.nextTick(() => console.log('This is process next log 1'));

Promise.resolve().then(() => console.log('Promise logs 1'));

process.nextTick(() => console.log('This is process next log 2'));

console.log('console log 2');

// ALl callbacks in nextTick queue are executed before the promise queue
