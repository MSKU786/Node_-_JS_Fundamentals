const { resolve } = require("path");

async function RetryAsyncFunction(fn, retries = 0) {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (retries < 3) {
    //  console.log(`Retrying... ${retries} times`);
      return new Promise(resolve => setTimeout(() => {
        resolve(RetryAsyncFunction(fn, retries + 1));
      }, retries*1000));

    }
    throw new Error("Max retries reached");
  }
}


let count = 0;

async function fn() {
  count++;
  if (count < 5) {
    throw new Error("Error");
  }
  return "Success";
}

RetryAsyncFunction(fn).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});

console.log(count);
console.log("--------------------------------");


async function AsyncSequentialExecution(tasks) {
  const results = new Array(tasks.length);

  for (let i=0; i<tasks.length; i++) {
    try {
      console.log(`Executing task ${i+1}`);
      const result = await RetryAsyncFunction(tasks[i]);
      results[i] = result;
    } catch(error) {
      results[i] = error;
    }
  }

  return results;
}



let count2 = 0;

async function fn2() {
  count2++;
  if (count2 < 5) {
    throw new Error("Error");
  }
  return "Success";
}

const tasks = [
  async () => new Promise(resolve => setTimeout(() => resolve("Task 1"), 1000)),
  fn2, 
  fn,
  async () => new Promise(resolve => resolve("Task 4")),
]

AsyncSequentialExecution(tasks).then(results => {
  console.log(results);
}).catch(error => {
  console.log(error);
});

console.log(count2);



