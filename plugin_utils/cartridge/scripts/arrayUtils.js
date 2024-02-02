/**
 * Set of utils for working with array in SFCC.
 * @module arrayUtils
 */


/**
 * Returns an array of unique values based on the provided array.
 * If a callback function is provided, it is applied to each element 
 * of the array to determine uniqueness based on the transformed values.
 * 
 * @param {array} - The input array.
 * @param {function} [callback] - A callback function applied to each element
 * of the array. It should return a value used for uniqueness comparison.
 * @returns {array} An array containing unique values based 
 * on the provided array.
 * 
 * @example
 * unique(['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE']);
 * // [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ]
 * 
 * unique(['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE'], item => item[0]);
 * // [ 'DE', 'BE', 'CZ', 'NL', 'EE' ]
 */
const unique = (array, callback) => {
  const uniqueValues = [];
  array.forEach(item => {
    const value = callback ? callback(item) : item;
    const isUnique = !uniqueValues.some(uniqueItem => {
      const returnedValue = callback ? callback(uniqueItem) : uniqueItem;
      return returnedValue === value;
    });
    if (isUnique) {
      uniqueValues.push(item);
    }
  });
  return uniqueValues;
};

/**
 * Flattens an array of arrays into a single-dimensional array.
 * 
 * @param {array} arrays - The array of arrays to flatten.
 * @returns {array} The flattened array.
 * 
 * @example
 * flatten([['DE', 'CZ'], 'US', ['BE'], ['DK', 'NL']]);
 * ['DE', 'CZ', 'US', 'BE', 'DK', 'NL']
 */
const flatten = (arrays) => {
  const flattenedArray = [];
  const flattenHelper = (arr) => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        flattenHelper(item);
      } else {
        flattenedArray.push(item);
      }
    });
  };
  flattenHelper(arrays);
  return flattenedArray;
};

/**
 * Finds the difference between an array and one or more arrays.
 * 
 * @param {Array} primaryArray - The primary array to compare.
 * @param {...Array} arraysToCompare - One or more arrays to compare with the primary array.
 * @returns {Array} An array containing the values that are present in the primary array
 * but not in any of the arrays to compare.
 * 
 * @example
 * difference(['DE', 'CZ', 'GB', 'DK'], ['DE', 'BE'], ['DK', 'NL', 'EE']);
 * ['CZ', 'GB']
 */
function difference() {
  const primaryArray = arguments[0];
  const arraysToCompare = [];
  for (let index = 1; index < arguments.length; index++) {
    let arg = arguments[index];
    if (Array.isArray(arg)) {
      arraysToCompare.push(arg);
    }
  }
  const flattenedArray = flatten(arraysToCompare);
  const diffArray = [];
  primaryArray.forEach(item => {
    const diffValue = !flattenedArray.includes(item);
    if (diffValue) {
      diffArray.push(item);
    }
  });
  return diffArray;
};


module.exports = {
  unique,
  flatten,
  difference
};