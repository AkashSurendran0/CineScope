import { createClient } from 'redis';
const redisClient = createClient({
    url: 'redis://localhost:6379',
});
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
(async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected');
    }
    catch (error) {
        console.error('Redis connection failed:', error);
    }
})();
export default redisClient;
