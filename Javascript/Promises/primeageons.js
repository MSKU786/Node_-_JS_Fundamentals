class AsyncQueue {
  constructor(concurrencyLimit) {
    this.tasks = [];
    this.runningTasks = 0;
    this.concurrencyLimit = concurrencyLimit;
  }

  // Function to add tasks to the queue
  enqueue(task) {
    this.tasks.push(task);
    this.runNext();
  }

  // Function to execute the next task
  runNext() {
    if (this.runningTasks < this.concurrencyLimit && this.tasks.length) {
      const task = this.tasks.shift();
      this.runningTasks++;
      task().then(() => {
        this.runningTasks--;
        this.runNext();
      });
    }
  }
}

// Creating the queue with a concurrency limit of 3
const queue = new AsyncQueue(3);

// Promise factory function
const createTask = (duration) => {
  return () =>
    new Promise((resolve) => {
      console.log(`Task started (Duration: ${duration}ms)`);
      setTimeout(() => {
        console.log(`Task completed (Duration: ${duration}ms)`);
        resolve();
      }, duration);
    });
};

// Adding tasks to the queue
for (let i = 1; i <= 10; i++) {
  queue.enqueue(createTask(i * 1000));
}

console.log(queue);
