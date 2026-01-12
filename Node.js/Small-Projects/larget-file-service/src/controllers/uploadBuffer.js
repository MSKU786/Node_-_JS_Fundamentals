import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../s3Client';

const upload = multer({
  storage: multer.memoryStorage(), // 🚨 buffers whole file
});

export const uploadBufferMiddleware = upload.single('file');

export const uploadBuffer = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const command = new PutObjectCommand({
    Bucket: 'my-test-bucket',
    Key: req.file.originalname,
    Body: req.file.buffer, // entire file in RAM
  });

  await s3.send(command);

  res.json({
    message: 'Uploaded using BUFFER approach',
    sizeInMB: (req.file.size / (1024 * 1024)).toFixed(2),
  });
};
