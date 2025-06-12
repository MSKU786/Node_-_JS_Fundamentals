const person = {
  fullName: function (city, country) {
    return `${this.firstName} ${this.lastName} from ${city}, ${country}`;
  },
};

const person1 = {
  firstName: 'John',
  lastName: 'Doe',
};

const person2 = {
  firstName: 'Jane',
  lastName: 'Smith',
};

// Using call() to invoke person.fullName with person1 as 'this'
console.log(person.fullName.call(person1, 'New York', 'USA'));
// Output: "John Doe from New York, USA"

// Using call() to invoke person.fullName with person2 as 'this'
console.log(person.fullName.call(person2, 'London', 'UK'));
// Output: "Jane Smith from London, UK"

const numbers = [5, 6, 2, 3, 7];

// Using apply() to find max number in array
const max = Math.max.apply(null, numbers);
console.log(max); // Output: 7

// Using apply() with our previous person example
console.log(person.fullName.apply(person1, ['Paris', 'France']));
// Output: "John Doe from Paris, France"
