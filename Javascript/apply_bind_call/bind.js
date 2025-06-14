// Bind is used to bind a function to an object

// 1. Fixing this in callback functions
const user = {
  name: 'Manish',
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const greetFunc = user.greet;
greetFunc(); // ❌ undefined (or global) - `this` is lost

const boundGreet = user.greet.bind(user);
boundGreet(); // ✅ Hello, Manish

// 2. Creating partially applied functions.
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // Fix `a = 2`
console.log(double(5)); // ✅ 10
