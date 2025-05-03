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
