function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('1');
  await sleep(3000);
  console.log('2');
}

main();

// Now main chaellnege to replace promise with our own implementation

class MyPromise {
  constructor(executor) {
  }
}




// Clearing the fundamentats
function practice1() {
  console.log('1')

  async function foo() {
    console.log('2')
    await Promise.resolve();
    console.log('3')
  }

  foo();

  Promise.resolve()
    .then(() => console.log('4'));

  console.log('5');
}


function practice2() {
  console.log('1');

  async function foo() {
    console.log('2');
    await Promise.resolve();
    console.log('3');
    await Promise.resolve();
    console.log('4');
  }

  setTimeout(() => console.log('5'), 0);
  foo()

  Promise.resolve()
    .then(() => console.log('6'))
    .then(() => console.log('7'));
  
  console.log('8')

  // 1 2 8 3 6 7 4 5 
}


/// Practive myPromiseALl


const myPromiseAll = (tasks) => {
  return new Promise((resolve,reject) => {
    const n = tasks.length;
    const results = new Array(n);
    let completed = 0;
    for (let i=0; i<n; i++) {
      tasks[i].then((result) => {
        results[i] = result;
        completed++;
        if (completed === n) {
          resolve(results);
        }
      })
      .catch((err) => {
        reject(err);
      });
    }
  })
}

const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve('A'), 1000)),
  () => Promise.resolve('B'),
  () => new Promise((resolve) => setTimeout(() => resolve('C'), 3000)),
  () => Promise.resolve('D'),
]

myPromiseAll(tasks)
  .then((results) => console.log(results))
  .catch((err) => console.log(err));



// Retry Mechanism

const retry = async (task, maxRetries = 3) => {
  try {
    return await task();
  } catch(error) {
    if (maxRetries > 0) {
      return retry(task, maxRetries - 1);
    } else {
      throw error;
    }
  }
  const result = await task();
}

let attempt2 = 0;

const eventuallSucceeds = () => new Promise((resolve, reject) => {
  attempt2++;
  console.log(`Attempt ${attempt2}`);
  if (attemp2 < 3) {
    reject('not yet')
  } else {
    resolve('finally succeeded')
  }
})

retry(eventuallSucceeds, 3).then((result) => console.log(result)).catch((error) => console.log(error));



const createTask = (id, ms, shouldFail = false) => () => 
  new Promise((resolve, reject) => {
    console.log(`Task ${id} started`)
    setTimeout(() => {
      if (shouldFail) {
        console.log(`Task ${id} failed`)
        reject(`Task ${id} failed`)
      } else {
        console.log(`Task ${id} done`)
        resolve(`Task ${id} result`)
      }
    },msg)
  });



const tasks2 = [
  createTask(1, 1000),
  createTask(2, 2000),
  createTask(3, 1000),
  createTask(4, 1000),
  createTask(5, 1500),
]


runWithLimit(tasks, 2);

const runWithLimit = (tasks, limit) => {
  return new Promise((resolve, reject) => {
    let completed = 0, currentIndex = 0;
    const results = new Array(task.length);

    const processTask = async (index) => {
      try {
        results[index] = await tasks[index]();
        completed++;

        if (completed == tasks.length) 
          resolve(results);
        else 
          addNext();
      } catch(err) {
        reject(err);
      }     
    }

    const addNext = () => {
      if (currentIndex >= tasks.length) return;
      const index = currentIndex;
      currentIndex++;
      processTask(index);
    }

    
    for (let i=0; i<limit; i++) {
      addNext();
    }
  })
}



class MyPromise {
  constructor(executor) {
    // What state should it start in
    this.state = 'pending'

    // what value does it hold
    this.value = undefined;

    // callback holder
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== 'pending')
        return;
      this.state = 'fulfiled';
      this.value = value;
      for (let callback of this.callbacks) 
        callback(this.value);
    }

    const reject = (reason) => {
      if (this.state !== 'pending ')
        return;
      this.state = 'failed';
      this.value = reason;
    }
  
    executor(resolve, reject);
  }


  then(onFullfilled) {
    if (this.state === 'pending') {
      this.callbacks.push(onFullfilled)
    }

    if (this.state === 'fulfilled') {
      onFullfilled(this.value);
    }
  }


}


const p = new MyPromise((resolve) => {
  setTimeout(() => resolve('hello'), 1000)
})


console.log(p);
setTimeout(() => console.log(p), 2000);