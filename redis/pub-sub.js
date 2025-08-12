import { channel, subscribe } from 'diagnostics_channel';
import test from 'node:test';
import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

//event listener

client.on('error', error => console.log('Redis client error occured!', error));

//publicher -> send message to channel
// subscriber-> consume the message

async function testRedisConnection() {
  try {
    await client.connect();

    const subscriber = client.duplicate(); //create a new client-> shares the sa,e connection
    await subscriber.connect(); //connect to redis server for the subscriber

    await subscriber.subscribe('dummy-channel', (message, channel) => {
      //subscribe to a channel
      console.log(`Received message: ${message} on channel: ${channel}`);
    });

    //publish message to the dummy channel
    await client.publish('dummy-channel', 'Hello from redis');
    await client.publish('dummy-channel', 'Enjoy this service');

    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscriber.unsubscribe('dummy-channel');
    await subscriber.quit(); //close subscribtion
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
