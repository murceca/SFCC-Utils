class Iterator {
  #fakeStorage;
  #index;

  constructor() {
    this.#fakeStorage = [];
    this.#index = -1;
  }

  setFakeStorage(storage) {
    this.#fakeStorage = storage;
  }

  hasNext() {
    return this.#index + 1 < this.#fakeStorage.length;
  }

  next() {
    this.#index = this.#index + 1;
    let result = this.#fakeStorage[this.#index];
    return result;
  }
}

module.exports = Iterator;