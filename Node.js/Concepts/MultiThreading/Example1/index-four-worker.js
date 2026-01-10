const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const PORT = 5000;

const THREAD_COUNT = 4;

app.get('/blocking', async (req, res) => {
  const workingPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workingPromises.push(createWorker());
  }

  const thread_result = await Promise.all(workingPromises);

  const total = thread_result.reduce((result, sum) => result + sum, 0);
  res.status(200).send(`This is blockin page ${total}`);
});

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./four-worker.js', {
      workerData: { thread_count: THREAD_COUNT },
    });
    worker.on('message', (data) => {
      resolve(data);
    });

    worker.on('error', (err) => {
      reject(err);
    });
  });
}

app.get('/non-blocking', (req, res) => {
  res.status(200).send('this is non blocking page');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
