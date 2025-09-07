import fetch from 'node-fetch';

const apiCall = (i) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
};

const array = [];
for (let i = 0; i < 10; i++) {
  array.push(apiCall(i));
}

Promise.all(array)
  .then((responses) => Promise.all(responses.map((result) => result.json())))
  .then((jsons) => jsons.map((json) => console.log(json)));
