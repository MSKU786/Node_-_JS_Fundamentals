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
    if (!node) return;
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
    node.next = null;
    node.prev = null;
    this.nodeMap.delete(userId);
  }

  addNewNode(userId, score) {
    let node = new Node(userId, score);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.nodeMap.set(userId, node);
      return;
    }

    let temp = this.head;
    while (temp && temp.score > score) {
      temp = temp.next;
    }

    if (!temp) {
      // Insert at tail
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else if (temp === this.head) {
      // Insert at head
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    } else {
      // Insert in the middle
      let prevNode = temp.prev;
      prevNode.next = node;
      node.prev = prevNode;
      node.next = temp;
      temp.prev = node;
    }
    this.nodeMap.set(userId, node);
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
