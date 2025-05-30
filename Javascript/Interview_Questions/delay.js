// First Apporach using while loop

function delaySync(ms) {
  console.log('Delaying sync for  ' + ms + 'ms');
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait - blocks the main thread
  }
}

function delay(ms) {
  console.log('Delaying for ' + ms + 'ms');
  const delayPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

  return delayPromise;
}

const run = async () => {
  console.log('Start');
  await delay(5000);
  console.log('Eng');
};

run();
