const { currentRunning, MAX_CONCURRENCY, jobQueue } = require('../data');

async function processQueue() {
  if (currentRunning >= MAX_CONCURRENCY && jobQueue.length <= 0) return;

  const jobId = jobQueue.shift();
  currentRunning++;
  await 
}
