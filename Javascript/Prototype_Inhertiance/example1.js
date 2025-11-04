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
