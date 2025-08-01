import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379',
});


redisClient.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected');
  } catch (error) {
    console.error('Redis connection failed:', error);
  }
})(); 

export default redisClient;
