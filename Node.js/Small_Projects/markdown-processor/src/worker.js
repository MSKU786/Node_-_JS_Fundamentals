import { markDownQueue } from './queue';
import { processMarkdownJob } from './jobs/markdownProcessor';

markDownQueue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  console.log(job);
  return await processMarkdownJob(job.data);
});

markdownQueue.on('succeeded', (job, result) => {
  console.log(`Job ${job.id} succeeded! Output: ${result.outputPath}`);
});

markdownQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
