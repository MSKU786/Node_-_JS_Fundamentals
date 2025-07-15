const phoneNumber = Array.from({ length: 1000 }, (_, i) => i + 1);

async function sendMessage(phoneNumber) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sending message to ${phoneNumber}`);
      resolve();
    }, 1000);
  });
}

let index = 0;
let limit = 100;
async function batchCalling() {
  let workers = [];
  console.log(index);
  for (let i = 0; i < limit; i++) {
    index++;
    workers.push(sendMessage(phoneNumber[index]));
  }

  await Promise.all(workers);
  if (index < phoneNumber.length) batchCalling();
}

batchCalling();
