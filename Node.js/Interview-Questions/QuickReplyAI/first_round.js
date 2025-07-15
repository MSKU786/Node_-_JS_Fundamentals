const phoneNumber = new Array(10000).fill(1);

async function sendMessage(phoneNumber) {
  return new Promise((resolve, reject) => {
    resolve(
      setTimeout(() => {
        console.log(phoneNumber);
      }, 1000)
    );
  });
}

let index = 0;
let limit = 100;
async function batchCalling() {
  let workers = [];

  for (let i = 0; i < limit; i++) {
    workers.push(sendMessage(phoneNumber[index++]));
  }

  await Promise.all(workers);
  batchCalling();
}

batchCalling();
