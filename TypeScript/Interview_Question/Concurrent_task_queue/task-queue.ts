/* 

Task: Build a queue that runs promises in parallel (max N at once).

*/
class TaskQueue<T> {
  private concurrency: number;
  private current: number;
  queue: Array<{
    task: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor(limit: number) {
    this.concurrency = limit;
    this.current = 0;
  }

  add(task: () => Promise<T>) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }

  private next() {
    if (this.current >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift();
    if (!item) {
      return;
    }
    const { task, resolve, reject } = item;
    this.current++;
    task()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.current--;
        this.next();
      });
  }
}

const queue = new TaskQueue<ApiResponse>(2); // 2 concurrent
