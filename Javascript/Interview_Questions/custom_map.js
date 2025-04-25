const arr = [1, 3, 4, 56, 24, 22];

Array.prototype.mymap = function (...args) {
  console.log(this);
  const fn = args[0];
  const newArr = [];
  for (let i of this) {
    newArr.push(fn(i));
  }

  return newArr;
};

const add2 = arr.map((a) => a + 2);

const add5 = arr.mymap((a) => a + 5);

console.log(arr);
console.log(add2);
console.log(add5);
