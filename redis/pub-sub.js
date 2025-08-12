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

    // const subscriber = client.duplicate(); //create a new client-> shares the sa,e connection
    // await subscriber.connect(); //connect to redis server for the subscriber

    // await subscriber.subscribe('dummy-channel', (message, channel) => {
    //   //subscribe to a channel
    //   console.log(`Received message: ${message} on channel: ${channel}`);
    // });

    // //publish message to the dummy channel
    // await client.publish('dummy-channel', 'Hello from redis');
    // await client.publish('dummy-channel', 'Enjoy this service');

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // await subscriber.unsubscribe('dummy-channel');
    //   await subscriber.quit(); //close subscribtion

    //pipelining and transaction
    //pipeline
    // const multi = client.multi();
    // multi.set('key1', 'value1');
    // multi.set('key2', 'value2');
    // multi.get('key1');
    // multi.get('key2');
    // const result = await multi.exec();
    // console.log(result);

    // const pipeline = client.multi();
    // pipeline.set('key3', 'value3');
    // pipeline.set('key4', 'value4');
    // pipeline.get('key3');
    // pipeline.get('key4');
    // const pipelineResult = await pipeline.exec();
    // console.log(pipelineResult);
    // //batch date operations ->
    // const batch = client.multi();
    // for (let i = 0; i < 10; i++) {
    //   batch.set(`key${i}`, `value${i}`);
    //   console.log(`batch ${i+1} is done `);
    // await batch.exec();
    // }
    //transaction
    const transaction = client.multi();
    transaction.decrBy('account:123:balance', 100);
    transaction.incrBy('account:456:balance', 100);
    const transactionResult = await transaction.exec();
    console.log(transactionResult);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
