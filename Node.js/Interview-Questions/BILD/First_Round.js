const { resolve } = require("path");

function RetryAsyncFunction(fn, retries = 0) {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (retries < 3) {
      new Promise(resolve => setTimeout(() => {
        resolve(RetryAsyncFunction(fn, retries + 1));
      }, retries*1000));
    }
    throw error;
  }
}