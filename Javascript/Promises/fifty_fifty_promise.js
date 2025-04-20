const fifty_fifty = new Promise((resolve, reject) => {
  const random = Math.random();
  setTimeout(() => {
    console.log(random);
    if (random > 0.5) {
      return resolve('Hello World');
    }
    return reject('Error Occured');
  }, 2000);
});

fifty_fifty
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
