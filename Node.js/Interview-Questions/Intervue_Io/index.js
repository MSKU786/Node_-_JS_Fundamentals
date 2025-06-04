import express from 'express';
import jobRouter from './routes/jobRoutes.js';

const app = express();

app.use(express.json());

app.use('/job-queue', jobRouter);
// let current = 1;
// const jobStatusMap = new Map();
// const jobQueue = [];
// const MAX_CONCURRENCY = 3;
// let currentRunning = 0;

// app.get('/job-queue/status', (req, res) => {
//   const pending = [];
//   const running = [];
//   const completed = [];

//   for (let [key, value] of jobStatusMap) {
//     let status = value.status;
//     if (status === 'Pending') pending.push(key);
//     else if (status === 'Running') running.push(key);
//     else completed.push(key);

//     const data = {
//       pending: pending,
//       running: running,
//       completed: completed,
//     };

//     res.status(200).json(data);
//   }
// });

// app.post('/job-queue/jobs', (req, res) => {
//   const jobId = `job-${current++}`;
//   jobStatusMap.set(jobId, {
//     status: 'Pending',
//   });
//   jobQueue.push(jobId);
//   processQueue();
//   res.status(201).json({ jobId });
// });

// async function processQueue() {
//   if (currentRunning >= MAX_CONCURRENCY && jobQueue.length <= 0) {
//     return;
//   }

//   const jobId = jobQueue.shift();

//   if (!jobId) {
//     return;
//   }

//   currentRunning++;
//   await simulateJob(jobId);
//   jobStatusMap.set(jobId, {
//     status: 'Completed',
//   });
//   console.log(`${jobId} is completed`);
//   currentRunning--;
//   processQueue();
// }

// function simulateJob(jobId) {
//   return new Promise((resolve, reject) => {
//     const timeout = Math.floor(Math.random() * (5 - 2)) + 2;
//     setTimeout(() => {
//       jobStatusMap.set(jobId, 'Running');
//       resolve();
//     }, timeout);
//   });
// }

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

/*

Problem Statement
Design and implement a simple Job Queue Processor in Node.js that accepts jobs and processes them concurrently with a fixed limit.

Requirements
Implement the following API endpoints using Express.js:

POST /job: Add a new job to the queue (simulated with a delay using setTimeout or sleep)

GET /status: Return current status of the queue:

pendingJobs

runningJobs

completedJobs

Each job is a simple task that:

Has a unique ID (e.g., UUID or incrementing ID)

Simulates work by waiting 2–5 seconds (Math.random())

The queue should process N jobs at a time, where N is configurable (e.g., 3 concurrent jobs max).

Constraints
No job should start processing if concurrency limit is reached.
Once a running job completes, the next job in the queue (if any) should start.
Jobs must process in the order they were submitted (FIFO).
The system must be able to track state of each job (pending, running, completed).

Bonus Requirements (Optional)
Add retry logic for failed jobs (fail 10% randomly).
Add ability to cancel a pending job via DELETE /job/:id.
Add ability to configure concurrency at runtime via POST /config.


*/
