// wirte a function which accept a function and timestamp as an arguemtn
// for that

function throtlling(fn, interval) {
  let lastexecution = 0;

  return function throthleExecution(...args) {
    currentTime = Date.now();
    // console.log(lastexecution, currentTime)
    if (currentTime - lastexecution >= interval) {
      fn(...args);
      lastexecution = currentTime;
    } else {
      console.log('not executed');
    }
  };
}

function printMessage() {
  console.log('Hiii');
}

tfn = throtlling(printMessage, 1000);

tfn();
tfn();

setTimeout(() => {
  tfn();
}, 1101);
