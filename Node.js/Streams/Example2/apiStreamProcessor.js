import fs from 'fs';
import fetch from 'node-fetch';
import { Readable } from 'stream';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchDataAsync = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
};

// Convert the json data to a readable stream
const jsonArrayToStream = (data) => {
  // Track which item we are currently processing
  let index = 0;

  const stream = new Readable({
    // objectMode: false because we're pushing stringified JSON
    objectMode: true,

    // read() is called whenever the consumer wants more data
    read() {
      if (index < data.length) {
        this.push(JSON.stringify(data[index++]));
      } else {
        this.push(null);
      }
    },
  });
  return stream;
};

class TransformStream extends Transform {
  constructor(options) {
    super(options);
  }

  async _transform(chunk, encoding, callback) {
    try {
      const upperTitle = chunk.title.toUpperCase();
      const joke = await fetch('https://api.chucknorris.io/jokes/random');
      const jokeData = await joke.json();
      const transformedChunk = {
        id: chunk.id,
        title: upperTitle,
        joke: jokeData.value,
      };

      this.push(JSON.stringify(transformedChunk));
      callback();
    } catch (err) {
      callback(err);
    }
  }
}
