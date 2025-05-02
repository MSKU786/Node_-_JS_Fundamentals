class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  remove(node) {
    let nextNode = node.next;
    let prevNode = node.prev;

    nextNode.prev = prevNode;
    prevNode.next = nextNode;
  }

  add(node) {
    let currentNode = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = currentNode;
    currentNode.prev = node;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    let node = this.cache.get(key);
    this.remove(node);
    this.add(node);
    return node.value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      let lruNode = this.cache.get(key);
      this.remove(lruNode);
      this.cache.delete(key);
    }

    if (this.cache.size() < this.capacity) {
      let delNode = this.tail.prev;
      this.cache.delete(delNode.key);
      this.remove(delNode);
    }

    let newNode = new Node(key, value);
    this.add(newNode);
    this.cache.set(key, newNode);
  }
}
