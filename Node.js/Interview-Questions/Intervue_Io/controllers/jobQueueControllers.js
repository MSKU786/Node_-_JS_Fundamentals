import { current, jobQueue, jobStatusMap } from '../data.js';
import { processQueue } from '../utils/queueProcessor.js';

export const jobQueueStatusController = (req, res) => {
  const pending = [];
  const running = [];
  const completed = [];

  for (let [key, value] of jobStatusMap) {
    let status = value.status;
    switch (status) {
      case 'Pending':
        pending.push(key);
        break;
      case 'Running':
        running.push(key);
        break;
      case 'Completed':
        completed.push(key);
        break;
    }
  }
  const data = {
    pending: pending,
    running: running,
    completed: completed,
  };

  res.status(200).json(data);
};

export const addJobController = (req, res) => {
  const jobId = `job-${current++}`;
  jobStatusMap.set(jobId, {
    status: 'Pending',
  });

  jobQueue.push(jobId);
  processQueue();
  res.status(201).json({ jobId });
};
