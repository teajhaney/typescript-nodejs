//readbale streams -> use for read
//writable streams -> write to file
//duplex streams -> use for both read and write (TCP socket)
//transform streams -> zlibs streams

import fs from 'fs';
import zlib from 'zlib';
import crypto from 'crypto';
import { Transform } from 'stream';

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); //encrypt the chunk data
    this.push(encrypted);
    callback();
  }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);
const readableStream = fs.createReadStream('input.txt');

//new gzip object compress the stream of data
const gzipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream('output.txt.gz.enc');

//read -> compress -> encrypt -> write

readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log(`Streaming -> compression -> encryption -> writing to file`);
