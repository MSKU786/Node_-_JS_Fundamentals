class InMemoryCache<K, V> {
  private map = new Map<K, V>();
  private expiryMap = new Map<K, number>();

  set(key: K, value: V, ttl: number): void {
    this.map.set(key, value);
    if (ttl > 0) {
      this.expiryMap.set(key, Date.now() + ttl);
    } else {
      this.expiryMap.delete(key); // treat as non-expiring
    }
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;

    const expiry = this.expiryMap.get(key);
    if (expiry !== undefined && expiry < Date.now()) {
      this.map.delete(key);
      this.expiryMap.delete(key);
      return undefined;
    }

    return this.map.get(key);
  }

  has(key: K): boolean {
    const expiry = this.expiryMap.get(key);
    if (expiry !== undefined && expiry < Date.now()) {
      this.map.delete(key);
      this.expiryMap.delete(key);
      return false;
    }

    return this.map.has(key);
  }
}
