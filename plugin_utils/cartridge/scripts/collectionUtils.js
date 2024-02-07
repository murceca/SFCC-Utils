/**
 * Set of utils for working with collections in SFCC.
 * @module collectionUtils
 */

const iteratorUtils = require('*/scripts/iteratorUtils');

/**
 * Iterates over each item in the collection and calls the provided callback function.
 * 
 * @param {dw.util.Collection} collection - The collection to iterate over.
 * @param {function} callback - The callback function to be called for each item.
 * Takes two arguments: the current item and its index.
 * @returns {void}
 */
function forEach(collection, callback) {
  iteratorUtils.forEach(collection.iterator(), callback);
}

/**
 * Creates a new array by applying the provided callback function to each item in the collection.
 * @param {dw.util.Collection} collection - The collection to map over.
 * @param {function} callback - The callback function to be called for each item.
 * Takes two arguments: the current item and its index. Returns the mapped value.
 * @returns {array} A new array containing the mapped values.
 */
function map(collection, callback) {
  return iteratorUtils.map(collection.iterator(), callback);
}

/**
 * Creates a new array containing only items from the collection that pass the test implemented by the provided callback function.
 * @param {dw.util.Collection} collection - The collection to filter.
 * @param {function} callback - The callback function to be called for each item.
 * Takes two arguments: the current item and its index.
 * Returns true to keep the item, false to exclude it.
 * @returns {array} A new array containing the filtered items.
 */
function filter(collection, callback) {
  return iteratorUtils.filter(collection.iterator(), callback);
}

/**
 * Applies an accumulator function against each item in the collection to reduce it to a single value.
 * @param {dw.util.Collection} collection - The collection to reduce.
 * @param {function} callback - The callback function to be called for each item.
 * Takes three arguments: the accumulator, the current item, and its index.
 * Returns the updated accumulator value.
 * @param {*} initialValue - The initial value of the accumulator.
 * @returns {*} The reduced value.
 */
function reduce(collection, callback, initialValue) {
  return iteratorUtils.reduce(collection.iterator(), callback, initialValue);
}

module.exports = {
  forEach,
  map,
  filter,
  reduce
};