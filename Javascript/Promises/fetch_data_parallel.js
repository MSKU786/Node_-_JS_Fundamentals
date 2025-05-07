// Using fetchSimulator simulate fetching data from three different URLs in parallel.

// Each "fetch" will be represented by a Promise that resolves after a delay taken from the delays array.

// Use Promise.all to wait for all these Promises to resolve and then process the results.

const delays = [800, 1200, 10000];

const fetchSimulator = (url, delay) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Data from ${url}`), delay)
  );
};

Promise.all(
  delays.map((delay, i) => {
    return fetchSimulator(i, delay);
  })
).then((results) => {
  console.log(results);
});
