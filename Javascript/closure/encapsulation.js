function createCounter() {
  let count = 0;

  return {
    increment: () => {
      return count++;
    },
    decrement: () => {
      return count--;
    },
    getValue: () => {
      console.log(count);
      return count;
    },
  };
}

const first = createCounter();
first.increment();
first.increment();

first.getValue();

first.decrement();
first.getValue();

process.nextTick(() => {
  console.log('hey');
});
