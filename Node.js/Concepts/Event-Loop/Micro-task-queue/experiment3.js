Promise.resolve().then(() => console.log('Promise 1'));

Promise.resolve().then(() => {
  console.log('Promise 2');
  process.nextTick(() =>
    console.log('This is ineer process tick inside promise')
  );
});

Promise.resolve().then(() => console.log('Promise 3'));

process.nextTick(() => console.log('Process tick 1'));

process.nextTick(() => {
  console.log('Process Tick 2');
  process.nextTick(() => {
    console.log('this is inner next ticket insider tick 2');
  });
});

process.nextTick(() => console.log('Process tick 3'));

/*
Process tick 1
Process Tick 2
Process tick 3
this is inner next ticket insider tick 2
Promise 1
Promise 2
Promise 3
This is ineer process tick inside promise
*/
