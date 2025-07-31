/*
Given an object or array obj, return a compact object.

A compact object is the same as the original object, except with key containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.

 
*/

var compactObject = function (obj) {
  let ans;

  if (Array.isArray(obj)) {
    ans = [];
    for (let o of obj) {
      if (typeof o === 'object') {
        ans.push(compactObject(o));
      } else if (Array.isArray(o)) {
        ans.push(compactObject(o));
      } else {
        if (o) {
          ans.push(o);
        }
      }
    }
  } else {
    ans = {};
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        ans[key] = compactObject(obj[key]);
      } else if (Array.isArray(obj[key])) {
        ans[key] = compactObject(obj[key]);
      } else {
        if (obj[key]) {
          ans[key] = obj[key];
        }
      }
    }
  }

  return ans;
};

console.log(compactObject([null, 0, false, 1]));
