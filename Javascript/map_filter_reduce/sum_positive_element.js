const input = [1, -4, 12, 0, -3, 29, -150];

const ans = input.reduce((acc, curr) => {
  console.log(acc, curr);
  if (curr > 0) {
    acc += curr;
    return acc;
  } else return acc;
});

console.log(input, ans);
