// batch-based concurrency,
const delay = (time, value) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log('Done:', value);
      resolve(value);
    }, time)
  );
const tasks = [
  delay(1000, 'A'),
  delay(500, 'B'),
  delay(2000, 'C'),
  delay(300, 'D'),
  delay(800, 'E'),
];

const myPromiseAll = async (promises, concurrency) => {
  let index = 0;
  const promiseResult = [];

  async function handleConcurrentPromise() {
    let concurrentPromise = [];
    let i = 0;
    while (i < concurrency && index < promises.length) {
      concurrentPromise.push(promises[index++]);
      i++;
    }
    const result = await Promise.all(concurrentPromise);
    console.log(result);
    promiseResult.push(...result);
    if (index < promises.length) {
      await handleConcurrentPromise();
    }
    return;
  }
  await handleConcurrentPromise();
  return promiseResult;
};

async function main() {
  const resolvedPromise = await myPromiseAll(tasks, 2);
  const mainPromised = await Promise.all(tasks);
  console.log(mainPromised);
  console.log(resolvedPromise);
}

main();
