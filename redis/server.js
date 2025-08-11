import Redis from 'redis';

const redis = Redis();

const client = redis.createClient({
	host: 'localhost',
	port: 6379
});
