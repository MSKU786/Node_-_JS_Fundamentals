import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../s3Client';

export const uploadStream = async (req, res) => {
  const fileName = req.headers['x-file-name'];
  if (!fileName) {
    return res.status(400).json({ error: 'Missing x-file-name header' });
  }

  const command = new PutObjectCommand({
    Bucket: 'my-test-bucket',
    Key: fileName,
    Body: req, // 🔥 stream directly
  });

  await s3.send(command);

  res.json({ message: 'Uploaded using STREAM approach' });
};
