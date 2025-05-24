class Cache<K, V> {
  private map;
  private expiryMap;
  constructor() {
    this.map = new Map<K, V>();
    this.expiryMap = new Map<K, number>();
  }

  set(key: K, value: V, ttl: number): void {}

  get(key: K): V | undefined {
    return undefined;
  }

  has(key: K): boolean {
    return false;
  }
}
