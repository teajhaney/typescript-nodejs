import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

//event listener

client.on('error', error => console.log('Redis client error occured!', error));

async function testREdisConnection() {
  try {
    await client.connect();
    console.log('Connected to redis');

    //set a value with a key
    await client.set('name', 'yusuf');

    //get thet value with the key
    const extractValue = await client.get('name');
    console.log(extractValue);

    //delete with a key
    const deleteValue = await client.del('name');
    console.log(deleteValue);

    const extractUpdatedValue = await client.get('name');
    console.log(extractUpdatedValue);

    //increament and decreament value
    await client.set('count', '100');
    const incrementCount = await client.incr('count');
    console.log(incrementCount);
    const decrementCount = await client.decr('count');
    console.log(decrementCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
    console.log('Disconnected from redis');
  }
}

testREdisConnection();
