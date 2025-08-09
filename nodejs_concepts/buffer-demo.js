const bufferOne = Buffer.alloc(10); //allocate a buffer of 10 bytes ->zeros

console.log(bufferOne);

const bufferFromString = Buffer.from('hello');

console.log(bufferFromString);

const bufferFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 0]);

console.log(bufferFromArrayOfIntegers);

bufferOne.write('Yusuf');

console.log('After writing Node js to bufferOne', bufferOne.toString());
