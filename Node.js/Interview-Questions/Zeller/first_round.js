// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

let arr = [1, 2, 3, [1, 2, 3, [1, 2, 3]]];

function nestedSum(arr) {
  if (arr.length == 0) return 0;

  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr, total, i);
    if (Array.isArray(arr[i])) {
      total += nestedSum(arr[i]);
    } else {
      total += arr[i];
    }
  }
  return total;
}

console.log(nestedSum(a));

/* Question 2 */
//let a = [1,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6]
//1 2 3 1 2 2 2 3 3 3 4 4 4
// output = [1,2,3,4,5,6,1,1,2,2,3,3,3,4,4,5,6]
// unique number of elements = 6

let a = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 5];
let n = a.length;
let temp = a[0];
let r = 1;

for (let i = 1; i < n; i++) {
  // console.log(r)
  while (r < n) {
    if (a[r] > temp) {
      let temp2 = a[r];
      a[r] = a[i];
      a[i] = temp2;
      temp = a[i];
      break;
    }
    r++;
  }

  //console.log(a)
  if (r > n) break;
  r--;
}

console.log(a);

/* Question 3 */
let obj = {
  name: 'Manish',
  age: 20,
};

let arr2 = [a, a, a];
arr2[0].name = 'Hero';

console.log(arr2[2]);

/* Question 4 


Question: Is javascript call by value or call by reference?
Answer: Javascript is call by value. But for objects and arrays, it is call by reference.

Question: If javascript is single threaded, where is event loop running or other components like microtask queue, timer queue, etc. running?
Answer: Event loop is running in the main thread. Other components like microtask queue, timer queue, etc. are running in the event loop.

*/
