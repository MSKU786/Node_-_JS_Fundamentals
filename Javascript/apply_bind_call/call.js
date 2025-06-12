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
