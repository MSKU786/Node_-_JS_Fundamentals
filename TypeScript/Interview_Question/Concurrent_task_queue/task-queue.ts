/* 

Task: Build a queue that runs promises in parallel (max N at once).

*/
type ApiResponse = {
  id: number,
  data: string
}

class TaskQueue<T>{
  size: number;
  queue: Array<() => Promise<T>> = [];
  running: number = 0;
  constructor(limit: number) {
    this.size =  limit;
  }

  add(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const run = () => {
        this.running++;
        task().then(resolve, reject).finally(() => {
          this.running--;
          this.next();
        });
      }

      if (this.running < this.size) {
        run();
      } else {
        this.queue.push(task);
      }
    })
  }

  private next() : void {
    if (this.queue.length > 0 && this.running < this.size) {
      const newTask = this.queue.shift();
      if (newTask) newTask();
    }
  }

   
}

const queue = new TaskQueue<ApiResponse>(2); // 2 concurrent
queue.add(() => fetch("/api/1")).then(...);
queue.add(() => fetch("/api/2")).then(...);
queue.add(() => fetch("/api/3")); // Waits until slot free


