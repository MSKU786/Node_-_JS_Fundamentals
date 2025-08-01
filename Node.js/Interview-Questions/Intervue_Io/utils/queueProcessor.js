import {
  jobQueue,
  jobStatusMap,
  MAX_CONCURRENCY,
  currentRunning,
} from '../data.js';

export async function processQueue() {
  if (currentRunning >= MAX_CONCURRENCY || jobQueue.length <= 0) {
    return;
  }

  const { jobId, retry } = jobQueue.shift();
  if (!jobId) {
    return;
  }

  currentRunning++;
  try {
    await simulateJob(jobId);
    jobStatusMap.set(jobId, {
      status: 'Completed',
    });
    console.log(`${jobId} is completed`);
  } catch (error) {
    console.error(`Error processing job ${jobId}:`, error);
    if (retry <= 3) {
      jobQueue.push({ jobId, retry: retry + 1 });
    }
    // Optionally implement retry logic here
  } finally {
    currentRunning--;
    processQueue();
  }
}

function simulateJob(jobId) {
  return new Promise((resolve, reject) => {
    const timeout = Math.floor(Math.random() * (5000 - 2000)) + 2000; // Random time between 2-5 seconds
    setTimeout(() => {
      jobStatusMap.set(jobId, {
        status: 'Running',
      });
      // Simulate 20% chance of failure
      if (Math.random() < 0.2) {
        reject(new Error('Job failed randomly'));
      } else {
        resolve();
      }
    }, timeout);
  });
}
