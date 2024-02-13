// netflix and spotify

// Client imports via CSV (excel)

/**
 * Imagine a 1gb csv file being uploaded by the user, if he has an internet capable of
 * uploading 10mb/s, that'll be 100s of uploading. *
 *  **/

// Readable Streams(csv) / Writable Streams (netflix)

// on nodejs, every IO port is a stream, that being every req and res is also a stream
// processes (stdin and stdout) are also IO ports/ streams

// Streams -> streams
// process.stdin.pipe(process.stdout)


import {Readable, Transform, Writable} from 'node:stream'

class oneToHundredStream extends Readable {
  index = 1
  _read(){
    const i = this.index++

    // if(i>100){
    //   this.push(null)
    // } else{

    //   // this will throw because streams cant work with primitive types( number, strings, boolean, etc), only an instance of Buffer or UInt8Array
    //   // this.push(i)

    //   const buf = Buffer.from(String(i))

    //   this.push(buf)
    // }
    setTimeout(() => {
      if(i>100){
        this.push(null)
      } else{
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
      }, 250);
  }
}

class inverseNumberStream extends Transform {
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class multiplyByTen extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString())*10)
    callback()
  }
}

// new oneToHundredStream().pipe(process.stdout)
// new oneToHundredStream().pipe(new multiplyByTen())
new oneToHundredStream().pipe(new inverseNumberStream()).pipe(new multiplyByTen())