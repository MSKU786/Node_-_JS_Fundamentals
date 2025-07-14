/*
Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the FreqStack class:

FreqStack() constructs an empty frequency stack.
void push(int val) pushes an integer val onto the top of the stack.
int pop() removes and returns the most frequent element in the stack.
If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.
*/

class FreqStack {
  countMap;
  orderMap;
  currentMax = 0;
  constructor() {
    this.countMap = new Map();
    this.orderMap = new Map();
  }

  push(val) {
    if (this.countMap.has(val)) {
      let count = this.countMap.get(val);
      this.countMap.set(val, count + 1);
      if (this.orderMap.has(count + 1)) {
        let currentList = this.orderMap.get(count + 1);
        currentList.push(val);
      } else {
        this.orderMap.set(count + 1, [val]);
      }
      this.currentMax = Math.max(this.currentMax, count + 1);
    } else {
      this.countMap.set(val, 1);
      let currentList = this.orderMap.get(1);
      currentList.push(val);
      this.currentMax = Math.max(this.currentMax, 1);
    }
  }

  pop() {
    if (this.orderMap.has(this.currentMax)) {
      let currentList = this.orderMap.get(this.currentMax);
      let element = this.currentList.pop();
      if (currentList.length === 0) {
        this.orderMap.delete(this.currentMax);
        this.currentMax--;
      }
      this.countMap.set(element, this.countMap.get(element) - 1);
    } else {
      this.currentMax--;
      this.pop();
    }
  }
}
