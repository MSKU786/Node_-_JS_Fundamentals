setImmediate(() => console.log('This is set immediate 1'));
setImmediate(() => {
  console.log('This is set immediate 2');
  process.nextTick(() => console.log('This is process ticket 1'));
  Promise.resolve().then(() => console.log('This is promise 1'));
});
setImmediate(() => console.log('This is set immediate 3'));

// MIcrotasks queue can be execute between check queue callbacks
