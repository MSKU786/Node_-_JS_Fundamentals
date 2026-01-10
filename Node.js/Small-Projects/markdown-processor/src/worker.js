import { markDownQueue } from './queue.js';
import { processMarkdownJob } from './jobs/markdownProcessor.js';

markDownQueue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  console.log(job);
  return await processMarkdownJob(job.data);
});

markDownQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded! Output: ${result.outputPath}`);
});

markDownQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
