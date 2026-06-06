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

