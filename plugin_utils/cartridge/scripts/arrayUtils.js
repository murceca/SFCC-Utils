/**
 * Returns an array of unique values based on the provided array.
 *
 * @param {array} - The source array.
 * @returns {array} - The array of unique values.
 *
 * @example
 * unique(['DE', 'BE', 'DE', 'CZ','NL', 'DK', 'NL', 'EE']);
 * // [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ]
 */
const unique = (array) => {
  const uniqueValues = [];
  array.forEach(value => {
    const isUnique = !uniqueValues.includes(value);
    if (isUnique) {
      uniqueValues.push(value);
    }
  });
  return uniqueValues;
};

module.exports = {
  unique
};