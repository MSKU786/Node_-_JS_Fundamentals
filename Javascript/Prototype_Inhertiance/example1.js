// Simple Example of Prototype Inheritance
const user = {
  name: 'Manish',
  sayHello: function () {
    console.log(`hello my name is ${this.name}`);
  },
};

const admin = Object.create(user);
admin.name = 'Admin';
admin.sayHello();

/*
Object.create(user) creates a new object admin whose prototype is user.

When we call admin.sayHello(), JS doesn’t find it on admin, so it looks into admin.__proto__ (which points to user).

It finds sayHello() there and executes it.

✅ Key point: The method is not copied — it’s shared via the prototype.
*/
