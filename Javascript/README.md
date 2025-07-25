# Javascript Concepts

### What is a Closure?

A **closure** is a function that **remembers the variables from its lexical scope**, even when the function is executed **outside that scope**.

### Why use Closures

1. Data Privacy / Encapsulation
2. Function Factories
3. Callbacks & Event Handlers

### Array in JS

In JavaScript, arrays are **heterogeneous**, meaning they can store elements of different types — like numbers, strings, objects, functions, and even other arrays — all in one array. Example:

```js
let arr = [
  1,
  'hello',
  true,
  { name: 'Manish' },
  [2, 3],
  () => console.log('Hi'),
];
```

### But how does this work internally?

Under the hood, JavaScript arrays are not like C/C++/Java arrays, which are fixed-type and fixed-size. Instead, JavaScript arrays are implemented as objects with numeric keys.

In JavaScript, when you put an object into an array, the array doesn't store the full object — it stores a reference (i.e., a pointer) to the object.

✅ **Key Point:**

- The size of an object itself is not directly tied to the array.
- What the array actually stores is a reference (similar to a memory address) to the object.
- Reference size is fixed, usually 4 bytes (32 bits) or 8 bytes (64 bits) depending on the JavaScript engine and whether the system is 32-bit or 64-bit.

# JavaScript's `apply`, `bind`, and `call` - Deep Explanation

These three methods control the `this` context in JavaScript functions and are fundamental to function invocation.

## `call()`

Invokes a function with a given `this` value and arguments provided individually.

### Syntax

```javascript
func.call(thisArg, arg1, arg2, ...)
```

## `bind()`

The bind() method creates a new function with a specific this value and, optionally, preset initial arguments.

```javascript
let boundFunc = originalFunc.bind(thisArg, arg1, arg2, ...);
```

- thisArg: The value to bind as this inside the function.
- arg1, arg2, ...: Optional arguments to be pre-applied (aka partial application).
- Returns a new function (doesn't invoke it immediately).

### Prototype Inheritance

In JavaScript, every object has an internal link to another object called its prototype. When trying to access a property or method, JavaScript will look up the chain of prototypes (called the prototype chain) until it finds it, or returns undefined.

✅ When to Use Prototype Inheritance

- When creating multiple similar objects (e.g., different kinds of animals)
- When you want shared methods (memory efficient)
- When learning how JavaScript's object system works under the hood
