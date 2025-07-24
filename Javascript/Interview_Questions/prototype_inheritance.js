// Base constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function () {
  console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
};

// Derived constructor function
function Employee(name, age, jobTitle) {
  // Call the Person constructor to initialize name and age
  Person.call(this, name, age);
  this.jobTitle = jobTitle;
}

// Inherit from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add Employee-specific method
Employee.prototype.describeJob = function () {
  console.log(`I work as a ${this.jobTitle}.`);
};

// Usage
const alice = new Employee('Alice', 30, 'Software Engineer');
alice.introduce(); // Hi, I'm Alice and I'm 30 years old.
alice.describeJob(); // I work as a Software Engineer.
