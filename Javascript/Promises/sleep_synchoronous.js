function sleep(timer) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timer);
  });
}

async function main() {
  console.log('1');
  await sleep(1000);
  console.log('2');
}

main();
