import express from 'express';
import multer from 'multer';
import path from 'path';
import { markDownQueue } from './queue';

const app = express();
const upload = multer({ dest: 'src/uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = path.resolve(req.file.path);
  const job = markDownQueue.createJob({ filePath }).save();
  res.json({ jobId: job.id, status: 'queued' });
});

app.get('/status/:id', async (req, res) => {
  const job = await markdownQueue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const state = await job.getState();
  res.json({ id: job.id, state });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
