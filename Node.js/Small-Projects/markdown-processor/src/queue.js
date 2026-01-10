import BeeQueue from 'bee-queue';
import dotenv from 'dotenv';
dotenv.config();

export const markDownQueue = new BeeQueue('markdown', {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});
