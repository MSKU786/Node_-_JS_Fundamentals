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

class AsyncQueue {
  constructor(intervalMs = 2000) {
    this.queue = [];
    this.intervalMs = intervalMs;

    this.isPaused = false;
    this.isProcessing = false;
    this.intervalId = null;
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(async () => {
      if (this.isPaused) return;
      if (this.isProcessing) return;
      if (this.queue.length === 0) return;

      this.isProcessing = true;

      const item = this.queue.shift();
      console.log('Dequeued:', item);

      // simulate async processing
      await this._wait(this.intervalMs);

      this.isProcessing = false;
    }, this.intervalMs);
  }

  enqueue(value) {
    this.queue.push(value);
    this.start();
  }

  pause() {
    this.isPaused = true;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.start();
  }

  updateInterval(newIntervalMs) {
    this.intervalMs = newIntervalMs;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.start();
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
