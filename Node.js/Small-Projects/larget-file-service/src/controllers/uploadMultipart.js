import { Upload } from '@aws-sdk/lib-storage';
import { s3 } from '../s3Client';

export const uploadMultipart = async (req, res) => {
  const fileName = req.headers['x-file-name'];

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: 'my-test-bucket',
      Key: fileName,
      Body: req,
    },
    queueSize: 4, // parallel parts
    partSize: 5 * 1024 * 1024, // 5MB
  });

  await upload.done();

  res.json({ message: 'Uploaded using MULTIPART approach' });
};
