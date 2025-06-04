const express = require('express');

const jobRouter = express.Router();

jobRouter.get('/status');
jobRouter.post('/jobs');

export default jobRouter;
