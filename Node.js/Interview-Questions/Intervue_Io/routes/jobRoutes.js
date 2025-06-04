import express from 'express';
import {
  addJobController,
  jobQueueStatusController,
} from '../controllers/jobQueueControllers.js';

const jobRouter = express.Router();

jobRouter.get('/status', jobQueueStatusController);
jobRouter.post('/jobs', addJobController);

export default jobRouter;
