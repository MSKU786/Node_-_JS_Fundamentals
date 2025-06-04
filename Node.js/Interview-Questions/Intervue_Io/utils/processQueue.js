import {
  currentRunning,
  MAX_CONCURRENCY,
  jobQueue,
  jobStatusMap,
} from '../data';

export async function processQueue() {
  if (currentRunning >= MAX_CONCURRENCY && jobQueue.length <= 0) return;

  const jobId = jobQueue.shift();
  currentRunning++;
  await sinulateJobs;
  currentRunning--;
}

export function sinulateJobs(jobId) {
  return new Promise((resolve, reject) => {
    let timeout = Math.floor(Math.random() * (5 - 2)) + 2;
    setTimeout(() => {
      jobStatusMap.set(jobId, 'Running');
      resolve();
    }, timeout);
  });
}
