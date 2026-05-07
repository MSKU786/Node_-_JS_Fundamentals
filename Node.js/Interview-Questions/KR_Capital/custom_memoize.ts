/*
Implement a class Memoize to memoize any function using
an LRU (Least Recently Used) cache.

Constructor:
new Memoize(fn: Function, cacheSize: number)

Methods:

1. getFunction()
   - returns memoized function

2. isEntryInCache(...args)
   - returns true if args exist in cache

3. getValueFromCache(...args)
   - returns cached value

LRU Rules:
- Cache stores only latest cacheSize entries
- When cache becomes full:
  remove least recently used entry
- Accessing an entry makes it most recently used

Example:

const obj = new Memoize(sum, 2)
const mem = obj.getFunction()

mem(1,2)
mem(2,3)
mem(1,2)

The third call should be a cache hit.
*/

class Memoize {

    private cache: Map<string, any>;

    constructor(private fn: Function, private cacheSize: number) {
        this.cache = new Map();
    }

    public getFunction(): Function {

        return (...args: any[]) => {

            const key = JSON.stringify(args);

            if (this.cache.has(key)) {

                const value = this.cache.get(key);

                // move to recent position
                this.cache.delete(key);
                this.cache.set(key, value);

                console.log(`Cache hit for - ${key}`);

                return value;
            }

            console.log(`Cache miss for - ${key}`);

            const result = this.fn(...args);

            if (this.cache.size >= this.cacheSize) {

                const firstKey = this.cache.keys().next().value;

                if (firstKey !== undefined) {
                    this.cache.delete(firstKey);
                }
            }

            this.cache.set(key, result);

            return result;
        };
    }

    public isEntryInCache(...args: any[]): boolean {

console.log(mem(1, 2));