/**
 * Returns an array of unique values based on the provided array.
 * If a callback function is provided, it is applied to each element 
 * of the array to determine uniqueness based on the transformed values.
 * 
 * @param {array} - The input array.
 * @param {function} [callback] - A callback function applied to each element
 * of the array. It should return a value used for uniqueness comparison.
 * @returns {array} - An array containing unique values based 
 * on the provided array.
 * 
 * @example
 * unique(['DE', 'BE', 'DE', 'CZ','NL', 'DK', 'NL', 'EE']);
 * // [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ]
 * 
 * unique(['DE', 'BE', 'DE', 'CZ','NL', 'DK', 'NL', 'EE'], item => item[0]);
 * // [ 'DE', 'BE', 'CZ', 'NL', 'EE' ]
 */
const unique = (array, callback) => {
  const uniqueValues = [];
  array.forEach(item => {
    const value = callback ? callback(item) : item;
    const isUnique = !uniqueValues.find(uniqueItem => {
      const returnedValue = callback ? callback(uniqueItem) : uniqueItem;
      return returnedValue === value;
    });
    if (isUnique) {
      uniqueValues.push(item);
    }
  });
  return uniqueValues;
};

module.exports = {
  unique
};