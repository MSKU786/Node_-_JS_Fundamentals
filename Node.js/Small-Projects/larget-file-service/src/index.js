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
 * 2️⃣ STREAM approach
 * Streams request directly to S3/MinIO
 */
app.post('/upload/stream', uploadStream);

/**
 * 3️⃣ MULTIPART approach
 * Parallel + resumable uploads
 */
app.post('/upload/multipart', uploadMultipart);

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
