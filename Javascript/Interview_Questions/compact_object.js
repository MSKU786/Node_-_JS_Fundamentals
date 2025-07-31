/*
Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with key containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.
*/

var compactObject = function (obj) {
  // Handle null/undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj
      .map((item) => compactObject(item))
      .filter((item) => Boolean(item));
  }

  // Handle objects
  if (typeof obj === 'object') {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      const compactedValue = compactObject(value);
      if (Boolean(compactedValue)) {
        result[key] = compactedValue;
      }
    }

    return result;
  }

  // Handle primitives - return as is (falsy values will be filtered out)
  return obj;
};

console.log(compactObject([null, 0, false, 1]));
console.log(compactObject({ a: null, b: [false, 1] }));
console.log(compactObject([null, 0, 5, [0], [false, 16]]));
