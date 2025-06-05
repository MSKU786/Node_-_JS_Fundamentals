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
  await simulateJobs(jobId);
  currentRunning--;
}

export function deletePendingJobId(jobId) {
  if (!jobId && !jobStatusMap.has(jobId)) {
    return false;
  }

  const jobData = jobStatusMap.get(jobId);
  if (jobData.status !== 'Pending') {
    return false;
  }

  let indexOfJob = jobQueue.indexOf(jobId);
  jobQueue.splice(indexOfJob, 1);
  jobStatusMap.delete(jobId);
  return true;
}

function simulateJobs(jobId) {
  return new Promise((resolve, reject) => {
    let timeout = Math.floor(Math.random() * (5 - 2)) + 2;
    setTimeout(() => {
      jobStatusMap.set(jobId, 'Running');
      resolve();
    }, timeout);
  });
}
