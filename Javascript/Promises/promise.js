const fetch = require('node-fetch');
// function fetchResult() {
//   return fetch(
//     'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
//   );
// }

// const fetchResponse = fetchResult();
// console.log(fetchResponse);

// fetchResponse.then((result) => {
//   const jsonResult = result.json();
//   jsonResult.then((data) => {
//     console.log(data);
//   });
// });
const fetchPromise = fetch(
  'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
);

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });
