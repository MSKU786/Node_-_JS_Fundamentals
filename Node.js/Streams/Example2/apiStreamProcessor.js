import fs from 'fs';
import fetch from 'node-fetch';
import { Readable, Transform, pipeline } from 'stream';
import { promisify } from 'util';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const pipelinePromise = promisify(pipeline);

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
      // Parse the JSON string back to object
      const data = JSON.parse(chunk);
      const upperTitle = data.title.toUpperCase();
      const joke = await fetch('https://api.chucknorris.io/jokes/random');
      const jokeData = await joke.json();
      const transformedChunk = {
        id: data.id,
        title: upperTitle,
        joke: jokeData.value,
      };

      this.push(JSON.stringify(transformedChunk) + ',\n');
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

(async () => {
  try {
    const posts = await fetchDataAsync();
    const readable = jsonArrayToStream(posts);
    const transform = new TransformStream();
    const writable = fs.createWriteStream('processed_posts.json');
    await pipelinePromise(readable, transform, writable);
    console.log('✅ Data enrichment complete. Check processed_posts.json');
  } catch (err) {
    console.error('❌ Pipeline failed:', err);
  }
})();
