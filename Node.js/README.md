# 🌀 Understanding the Node.js Event Loop

The **Node.js Event Loop** enables non-blocking I/O by offloading operations and handling them asynchronously.

---

## 🧱 Phases of the Event Loop

1. **Timers** – Executes `setTimeout` and `setInterval` callbacks.
2. **Pending Callbacks** – Executes I/O callbacks deferred to the next loop.
3. **Idle, Prepare** – Used internally.
4. **Poll** – Retrieves I/O events, executes I/O callbacks.
5. **Check** – Executes `setImmediate()` callbacks.
6. **Close Callbacks** – Executes `close` event callbacks like `socket.on('close')`.

> Between each phase, the **microtask queue** is processed (includes `process.nextTick` and `Promise.then`).

---

## 🌀 Decorators

In Node.js (or more precisely, in JavaScript/TypeScript), decorators are a special kind of declaration that can be attached to a class, method, property, or parameter to modify its behavior. They are mostly used in TypeScript and not natively supported in JavaScript yet, though they are part of the ECMAScript proposal.

### 🎯 Types of Decorators

- Class Decorator
- Method Decorator
- Property Decorator
- Parameter Decorator

```ts
// Method Decorator

function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Calling add with [2, 3]
```

```ts
// Property Decorator
function Readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

class Example {
  @Readonly
  name = 'Test';
}

const e = new Example();
e.name = 'Changed'; // This will fail silently or throw in strict mode
```

## Middlewares

Middleware in Express refers to functions that process requests before reaching the route handlers. These functions can modify the request and response objects, end the request-response cycle, or call the next middleware function. Middleware functions are executed in the order they are defined. They can perform tasks like authentication, logging, or error handling. Middleware helps separate concerns and manage complex routes efficiently.

```js
app.use((req, res, next) => {
  console.log('Middleware executed');
  next();
});
```

- **next():** This function is called to pass control to the next middleware in the stack if the current one doesn't end the request-response cycle.
