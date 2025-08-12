import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

//event listener

client.on('error', error => console.log('Redis client error occured!', error));

async function redisDataStructures() {
  try {
    // Connect to Redis first
    await client.connect();
    //strings-> set,get,mset, mget
    // await client.set('user:name', 'yusuf Tijani');
    // const name = await client.get('user:name');
    // console.log(name);

    // await client.mSet([
    //   'user:email',
    //   'yusuf@email',
    //   'user:age',
    //   '25',
    //   'user:country',
    //   'Nigeria',
    // ]);
    // const [email, age, country] = await client.mGet([
    //   'user:email',
    //   'user:age',
    //   'user:country',
    // ]);
    // console.log(email, age, country);

    //list-> LPUSH, RPUSH,LRANGE,LPOP
    // await client.del('notes');
    // await client.lPush('notes', ['note1', 'note2', 'note3']);
    // const extractNotes = await client.lRange('notes', 0, -1);
    // console.log(extractNotes);
    // const firstNote = await client.lPop('notes');
    // console.log(firstNote);
    // const remainingNotes = await client.lRange('notes', 0, -1);
    //   console.log(remainingNotes);

    //set-> SADD, SMEMBERS, SISMEMBER, SREM
    // await client.sAdd('users', ['user1', 'user2', 'user3']); //add members
    // const extractUsers = await client.sMembers('users'); // print members
    // console.log(extractUsers);
    // const isMember = await client.sIsMember('users', 'user2'); // check if part of members
    // console.log(isMember);
    // await client.sRem('users', 'user1'); //remove members
    // const remainingUsers = await client.sMembers('users');
    // console.log(remainingUsers);

    //sorted sets
    //zadd, zrange, zrank, zrem
    // await client.del('cart');
    // await client.zAdd('cart', [
    //   { score: 400, value: 'cart 1' },
    //   { score: 200, value: 'cart 2' },
    //   { score: 300, value: 'cart 3' },
    // ]);

    // const getToCartItem = await client.zRange('cart', 0, -1);
    // console.log(getToCartItem);

    // const cartWithScore = await client.zRangeWithScores('cart', 0, -1);
    // console.log(cartWithScore);

    // const cartWithRank = await client.zRank('cart', 'cart 2');
    // console.log(cartWithRank);

    //hashes -> hset, hget, hgetall, hdel
    await client.del('product:1');
    await client.hSet('product:1', {
      name: 'Product 1',
      description: 'product one description',
      rating: '5',
    });
    const getProductProperties = await client.hGet('product:1', 'rating');
    console.log(getProductProperties);

    const getProductDetails = await client.hGetAll('product:1');
    console.log(getProductDetails);

    await client.hDel('product:1', 'rating');
    const getUpaatedProductDetails = await client.hGetAll('product:1');
    console.log(getUpaatedProductDetails);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

redisDataStructures();
