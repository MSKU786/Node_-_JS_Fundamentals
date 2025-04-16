const curry = (a) => {
  return (b) => {
    if (!b) return a;
    else return curry(a + b);
  };
};

let ans = curry(1)(2)(3)(4);
console.log(ans);
