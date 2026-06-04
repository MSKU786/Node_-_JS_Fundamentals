function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('1');
  await sleep(3000);
  console.log('2');
}

main();

// Now main chaellnege to replace promise with our own implementation

class MyPromise {
  constructor(executor) {
  }
}




// Clearing the fundamentats
function practice1() {
  console.log('1')

  async function foo() {
    console.log('2')
    await Promise.resolve();
    console.log('3')
  }

  foo();

  Promise.resolve()
    .then(() => console.log('4'));

  console.log('5');
}
