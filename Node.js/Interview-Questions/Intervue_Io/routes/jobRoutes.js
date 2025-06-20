import express from 'express';
import {
  addJobController,
  jobQueueStatusController,
  deleteJobId,
  updateMaxConcurrencyController,
} from '../controllers/jobQueueControllers.js';

const jobRouter = express.Router();

jobRouter.get('/status', jobQueueStatusController);
jobRouter.post('/jobs', addJobController);
jobRouter.delete('/jobs/:id', deleteJobId);
jobRouter.post('/admin/update-max-concurrency', updateMaxConcurrencyController);

export default jobRouter;
