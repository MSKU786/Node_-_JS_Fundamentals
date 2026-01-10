const express = require('express');
import {
  uploadBuffer,
  uploadBufferMiddleware,
} from './controllers/uploadBuffer';

const app = express();
const PORT = 3000;

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

/**
 * 1️⃣ Naive BUFFER approach
 * Uses multer memory storage
 */
app.post('/upload/buffer', uploadBufferMiddleware, uploadBuffer);

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
