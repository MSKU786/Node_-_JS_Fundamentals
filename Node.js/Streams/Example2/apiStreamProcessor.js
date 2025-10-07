import fs from 'fs';
import fetch from 'node-fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const fetchDataAsync = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
};

// Convert the json data to a readable stream

const jsonArrayToStream = (data) => {
  let index = 0;
  const stream = new Readable({
    objectMode: true,
    read() {
      if (index < data.length) {
        stream.push(JSON.stringify(data[index++]));
      } else {
        stream.push(null);
      }
    },
  });
  return stream;
};
