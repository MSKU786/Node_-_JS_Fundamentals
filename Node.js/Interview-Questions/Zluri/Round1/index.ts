// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const coins = [9, 10, 3, 2, 6, 1, 8, 7];

function winner() {
  let count = 0,
    currentMax = 0;
  for (let coin of coins) {
    if (currentMax < coin) {
      count++;
      currentMax = coin;
    }
  }

  if (count % 2 == 1) {
    return 'Winner A';
  } else {
    return 'Winner B';
  }
}

console.log(winner());

/*

class AllForOne {

  increment()
  decrement()

  maxFreq()
  minFreq()

}


*/
