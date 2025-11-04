// Before Es6

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const manish = new Person('Manish', 25);
const raj = new Person('Raj', 27);

manish.sayHi(); // Hi, I'm Manish
raj.sayHi(); // Hi, I'm Raj

/*
What happens here:

new Person() creates a new object and links it to Person.prototype.

sayHi is defined once in Person.prototype, and shared by all instances — saves memory.

*/

// Same example using ES6

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const manish2 = new Person('Manish', 25);
manish2.sayHi();

/*
✅ Internally:

Person.prototype.sayHi → shared among all instances.

manish.__proto__ → points to Person.prototype.

*/
