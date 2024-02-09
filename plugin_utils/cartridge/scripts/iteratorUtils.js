/**
 * Set of utils for working with iterators in SFCC.
 * @module iteratorUtils
 */

const SeekableIterator = require('dw/util/SeekableIterator');

/**
 * Iterates over each item in the iterator and calls the provided callback function.
 * 
 * @param {dw.util.Iterator} iterator - The iterator to iterate over.
 * @param {function} callback - The callback function to be called for each item.
 * Takes two arguments: the current item and its index.
 * @returns {void}
 */
function forEach(iterator, callback) {
  for (let index = 0; iterator.hasNext(); index++) {
    let currentItem = iterator.next();
    callback(currentItem, index);
  }

  if (iterator instanceof SeekableIterator) {
    iterator.close();
  }
}

/**
 * Maps each item in the iterator using the provided callback function.
 * 
 * @param {dw.util.Iterator} iterator - The iterator to iterate over.
 * @param {function} callback - The callback function to map each item.
 * Takes two arguments: the current item and its index.
 * @returns {array} A new array containing the mapped items.
 */
function map(iterator, callback) {
  let resultArray = [];

  forEach(iterator, (currentItem, index) => {
    let mappedItem = callback(currentItem, index);
    resultArray.push(mappedItem);
  });

  return resultArray;
}

/**
 * Filters items in the iterator based on the provided callback function.
 * 
 * @param {dw.util.Iterator} iterator - The iterator to iterate over.
 * @param {function} callback - The callback function to filter items.
 * Takes two arguments: the current item and its index.
 * @returns {array} An array containing the filtered items.
 */
function filter(iterator, callback) {
  let filteredArray = [];

  forEach(iterator, (currentItem, index) => {
    if (callback(currentItem, index)) {
      filteredArray.push(currentItem);
    }
  });

  return filteredArray;
}

/**
 * Reduces the items in the iterator to a single value using the provided callback function.
 * 
 * @param {dw.util.Iterator} iterator - The iterator to iterate over.
 * @param {function} callback - The callback function to reduce items.
 * Takes three arguments: the accumulator, the current item, and its index.
 * @param {*} initialValue - The initial value of the accumulator.
 * @returns {*} The final value of the accumulator after iteration.
 */
function reduce(iterator, callback, initialValue) {
  let accumulator = initialValue;

  forEach(iterator, (currentItem, index) => {
    if (accumulator === undefined && index === 0) {
      accumulator = currentItem;
    } else {
      accumulator = callback(accumulator, currentItem, index);
    }
  });

  return accumulator;
}

module.exports = {
  forEach,
  map,
  filter,
  reduce
};