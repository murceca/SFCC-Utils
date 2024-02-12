const Iterator = require('./Iterator');

class Collection {
  #fakeStorage;
  #fakeIterator;

  constructor() {
    this.#fakeStorage = [];
    this.#fakeIterator = new Iterator();
    this.#fakeIterator.setFakeStorage(this.#fakeStorage);
  }

  add(...items) {
    this.#fakeStorage.push(...items);
  }

  iterator() {
    return this.#fakeIterator;
  }
}

module.exports = Collection;