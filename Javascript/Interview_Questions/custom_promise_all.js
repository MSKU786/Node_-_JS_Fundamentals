// Write a function that accepts an array of promises and returns a new promise that resolves only when all input promises resolve, and returns an array of results. If any promise rejects, the entire function should reject.
// Example - 01 : All Approve

const promises = [
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 5000)),
  new Promise((resolve) => setTimeout(() => resolve(4), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(5), 1000)),
];

const promises2 = [
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 5000)),
  new Promise((resolve, reject) => setTimeout(() => reject(4), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(5), 1000)),
];

function PromiseAll(promises) {
  const result = new Promise((resolve, reject) => {
    const resolved = new Array(promises.length).fill(null);
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((value) => {
          resolved[i] = value;
          count++;

          if (count == promises.length) resolve(resolved);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
  return result;
}

PromiseAll(promises).then((results) => console.log(results));
PromiseAll(promises2)
  .then((results) => console.log(results))
  .catch((err) => console.log(err));
