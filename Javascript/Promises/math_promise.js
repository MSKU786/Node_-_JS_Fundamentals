const double = (val) => {
  return new Promise((resolve) => resolve(val * 2));
};

const addTen = (val) => {
  return new Promise((resolve) => resolve(val + 10));
};

const multiplyByThree = (val) => {
  return new Promise((resolve) => resolve(val * 3));
};

const value = 5;

double(value)
  .then(addTen)
  .then(multiplyByThree)
  .then((result) => {
    console.log(result);
  });
