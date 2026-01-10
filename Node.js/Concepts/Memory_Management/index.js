const express = require('express');
const app = express();
const EventEmitter = require('events');
const fs = require('fs');

const eventEmitter = new EventEmitter();

// ============================================================================
// MEMORY LEAK EXAMPLE 1: Global Variables
// ============================================================================
// Global variables always cause memory leaks because they are directly
// connected to the root of the heap, so the variable always has a link to heap.
// They are never garbage collected and persist throughout the application lifetime.
let tasks = []; // ❌ LEAK: Global array that grows indefinitely
let cache = {}; // ❌ LEAK: Global cache with no size limit

const PORT = process.env.PORT || 3000;

// ============================================================================
// MEMORY LEAK EXAMPLE 2: Closures Holding References to Request Objects
// ============================================================================
app.get('/home', (req, res) => {
  // ❌ LEAK: Closure captures 'req' object and stores it in global array
  // The 'req' object contains the entire request context, headers, body, etc.
  // Since 'tasks' is global, these closures are never garbage collected
  tasks.push(function () {
    return req.headers; // Holding reference to req even after request completes
  });

  // ❌ LEAK: Creating huge array with reference to request object
  // This array is created on every request but never cleaned up
  // Each request object can be large (includes headers, body, query params, etc.)
  const hugeArray = new Array(10000000).fill(req);

  res.send('Hello world');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 3: Event Listeners Not Removed
// ============================================================================
app.get('/events', (req, res) => {
  // ❌ LEAK: Adding event listener on every request without removing it
  // Each listener holds a closure with references to req/res objects
  // Over time, thousands of listeners accumulate
  eventEmitter.on('start', () => {
    console.log('Event triggered', req.url); // Holds reference to req
  });

  eventEmitter.emit('start');
  res.send('Event emitted');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 4: Circular References
// ============================================================================
app.get('/circular', (req, res) => {
  // ❌ LEAK: Creating circular reference
  // While modern JS engines can handle circular references, if these objects
  // are stored in global scope or long-lived structures, they won't be GC'd
  req.user = {
    id: 1,
    username: 'Inefficient User',
    badObject: req, // Circular reference: req -> user -> req
  };

  // Adding to global cache creates permanent reference
  cache[req.query.id] = req.user; // ❌ Never cleaned up

  res.send('Circular reference created');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 5: Timers/Intervals Not Cleared
// ============================================================================
app.get('/timers', (req, res) => {
  // ❌ LEAK: setInterval creates timer that runs forever
  // Each timer holds a closure with references to req/res
  // Timers are not garbage collected until cleared
  const intervalId = setInterval(() => {
    console.log('Timer running', req.url); // Holds reference to req
    // If this is never cleared, it runs forever
  }, 1000);

  // ❌ LEAK: setTimeout that captures large objects
  setTimeout(() => {
    const data = req.body; // Holding reference to request
    console.log(data);
  }, 5000);

  res.send('Timers created');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 6: Unbounded Cache/Map
// ============================================================================
app.get('/cache', (req, res) => {
  // ❌ LEAK: Cache that grows without bounds
  // No LRU (Least Recently Used) eviction policy
  // No maximum size limit
  const key = req.query.key || 'default';
  cache[key] = {
    data: new Array(1000000).fill(0), // Large data stored
    timestamp: Date.now(),
    request: req, // Storing entire request object
  };

  res.send('Data cached');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 7: Unclosed File Streams
// ============================================================================
app.get('/file', (req, res) => {
  // ❌ LEAK: File stream not properly closed
  // File handles remain open, consuming memory and file descriptors
  const stream = fs.createReadStream('large-file.txt');

  stream.on('data', (chunk) => {
    // Processing data but stream might not be closed properly
    console.log('Reading chunk');
  });

  // Missing: stream.close() or stream.destroy()
  res.send('File stream created');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 8: Promises That Never Resolve
// ============================================================================
app.get('/promises', (req, res) => {
  // ❌ LEAK: Promise that never resolves/rejects
  // Holds references to all variables in its closure
  const pendingPromise = new Promise((resolve, reject) => {
    // Never calls resolve or reject
    // Holds reference to req in closure
    console.log('Promise created for:', req.url);
  });

  // Promise stored in global array - never garbage collected
  tasks.push(pendingPromise);

  res.send('Promise created');
});

// ============================================================================
// MEMORY LEAK EXAMPLE 9: DOM References (if running in browser-like environment)
// ============================================================================
// Note: This applies more to browser environments, but can occur in server-side
// rendering scenarios (e.g., with jsdom)

// ============================================================================
// MEMORY LEAK EXAMPLE 10: Closures in Loops
// ============================================================================
app.get('/closures', (req, res) => {
  // ❌ LEAK: Closures in loops that capture outer variables
  const handlers = [];

  for (let i = 0; i < 1000; i++) {
    // Each handler captures 'req' and 'i'
    handlers.push(() => {
      console.log(`Handler ${i} for ${req.url}`);
    });
  }

  // Handlers stored globally - never cleaned up
  tasks.push(...handlers);

  res.send('Closures created');
});

// ============================================================================
// BEST PRACTICES TO AVOID MEMORY LEAKS:
// ============================================================================
// 1. Avoid global variables - use module-level variables or dependency injection
// 2. Remove event listeners when done: eventEmitter.off() or removeListener()
// 3. Clear timers: clearInterval(), clearTimeout()
// 4. Close streams: stream.close(), stream.destroy()
// 5. Implement cache eviction policies (LRU, TTL, max size)
// 6. Avoid storing request/response objects in long-lived structures
// 7. Use weak references (WeakMap, WeakSet) when appropriate
// 8. Regularly profile memory usage in production
// 9. Set maximum limits on arrays, maps, caches
// 10. Clean up closures that hold large object references

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
