// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
// Design a Leaderboard System
// ✅ Users can:
// submitScore(userId, score) → submit/update their high score.

// top(K) → return top-K user scores, sorted descending.

// reset(userId) → clear that user’s score

// 1 -> 30
// 2 -> 30
// 3 -> 10
// 4 -> 50

// topK

class Node {
  id;
  score;
  next = null;
  prev = null;
  constructor(id, score) {
    this.id = id;
    this.score = score;
  }
}

class LeaderBoard {
  scores = null;
  head = null;
  tail = null;
  nodeMap = null;
  //sortedScores = null;
  constructor() {
    this.scores = new Map();
    this.nodeMap = new Map();
    //this.sortedScores = new Array();
  }

  submitScore(userId, score) {
    if (this.scores.has(userId)) removeExistingNode(userId);
    this.scores.set(userId, score);
    this.addNewNode(userId, score);
  }

  // 10 -> 30 => 40 => 50

  //10 => 40 => 50 O(1)
  // 10 => 40 => 50 => 60

  topK(k) {
    let temp = this.tail;
    let i = 0;
    let ans = [];
    while (i < k && temp != null) {
      ans.push([temp.id, temp.score]);
      temp = temp.prev;
      i++;
    }

    return ans;
  }

  reset(userId) {
    this.scores.remove(userId);
    this.removeExistingNode(userId);
  }

  removeExistingNode(userId) {
    let node = this.nodeMap.get(userId);
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    next.prev = prev;
    node.next = null;
    node.prev = null;
    this.nodeMap.remove(userId);
  }

  addNewNode(userId, score) {
    let node = new Node(userId, score);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
      this.nodeMap.set(userId, node);
      return;
    }

    let temp = this.head;
    while (this.temp != null && this.temp.score < score) {
      temp = temp.next;
    }

    // 10 -> 30 -> 50 -> 60

    if (this.temp == this.head) {
      this.head = node;
      node.next = temp;
    } else if (this.temp) {
      let prevNode = temp.prev;
      node.next = temp;
      node.prev = temp.prev;
      temp.prev = node;
      prevNode.next = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = this.tail.next;
    }

    this.nodeMap.set(userId, node);

    return;
  }
}

// 0(N) => Insertion
// 0(1) => deltion
// 0(K) => Top K

let leader = new LeaderBoard();
leader.submitScore(1, 50);
leader.submitScore(2, 30);

console.log(leader.topK(2));
leader.submitScore(3, 40);
leader.submitScore(5, 20);

console.log(leader.topK(4));
