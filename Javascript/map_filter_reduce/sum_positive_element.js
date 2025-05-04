const input = [1, -4, 12, 0, -3, 29, -150];

const ans = input.reduce((acc, curr) => {
  console.log(acc, curr);
  if (curr > 0) {
    acc += curr;
    return acc;
  } else return acc;
});

console.log(input, ans);

// Map is used when you want to return new array with updated values
const mapAns = input.map((a) => a * 2);
console.log(mapAns);

// Filter is used to filer values it will also return a new array
const inputFilter = input.filter((a) => a >= 0);
console.log(inputFilter);
