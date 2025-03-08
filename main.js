export class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.loadFactor = 0.75;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  // override if the key already have | push one if there not are | if the same hashCode push new one next to it
  set(key, value) {
    const index = this.hash(key);

    // If bucket is empty, initialize it as an array
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    // Check if key already exists
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update value if key exists
        return;
      }
    }

    // Add new key-value pair
    bucket.push([key, value]);
    this.size++;

    if (this.size > this.threshold) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]; // Return value if key found
      }
    }
    return undefined; // Key not found
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true; // Return value if key found
      }
    }
    return false; // Key not found
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false; // Key not found
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  key() {
    let allKeys = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [key, _] of bucket) {
          allKeys.push(key);
        }
      }
    }

    return allKeys;
  }

  value() {
    let allValues = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let [_, value] of bucket) {
          allValues.push(value);
        }
      }
    }

    return allValues;
  }

  entries() {
    let result = [];

    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          result.push(pair);
        }
      }
    }

    return result;
  }
}
