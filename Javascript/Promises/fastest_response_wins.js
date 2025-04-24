const delays = [8000, 1200, 1000];

const fetchSimulator = (url, delay) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Data from ${url}`), delay)
  );
};

Promise.race(
  delays.map((delay, i) => {
    return fetchSimulator(`https://msku.com/${i}`, delay);
  })
).then((result) => {
  console.log(result);
});
