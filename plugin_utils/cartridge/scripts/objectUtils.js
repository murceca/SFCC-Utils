/**
 * Set of utils for working with any kind of objects in SFCC.
 * @module objectUtils
 */

const Logger = require('dw/system/Logger');

/**
 * Parses stringified JSON value. Never throws any exceptions,
 * but outputs JSON parsing errors into logs.
 * 
 * @param {string} jsonString - JSON string.
 * @returns {Object|null} Parsed JSON value or `null`.
 * 
 * @example
 * parseJSON('{"countryCode":"CZ"}');
 * // {"countryCode":"CZ"}
 */
const parseJSON = (jsonString) => {
  let jsonObject = null;
  try {
    jsonObject = JSON.parse(jsonString);
  }
  catch (jsonParsingError) {
    Logger.error(jsonParsingError);
  }
  return jsonObject;
};

/**
 * Retrieves a property from an object based on the provided path.
 * Never throws any exceptions, but outputs retrieving property errors into logs.
 * 
 * @param {Object} obj - The object from which to retrieve the property.
 * @param {string} path - The path to the desired property.
 * Use dot notation for object properties and square brackets
 * with indices for array elements (e.g., 'property[0].nested.property').
 * @returns {*} The value of the specified property if found;
 * otherwise, returns undefined.
 * 
 * @example
 * get(customer1, 'addressBook.preferredAddress.city');
 * get(product1, 'pageMetaTags[0].ID');
 */
const get = (obj, path) => {
  try {
    const properties = path.split('.');
    return properties.reduce((acc, current) => {
      const match = current.match(/(\w+)(\[(\d+)\])?/);
      if (match) {
        const key = match[1];
        const index = match[3];
        if (index !== undefined) {
          return acc && acc[key] ? acc[key][index] : undefined;
        } else {
          return acc && acc[key] ? acc[key] : undefined;
        }
      } else {
        return undefined;
      }
    }, obj);
  } catch (error) {
    Logger.error(error);
  }
};

/**
 * Creates a new object by picking specific properties from a source object
 * based on either a list of property names or a filtering function.
 * 
 * @param {Object} primaryObject - The source object from which 
 * properties will be picked.
 * @param {...(string|function)} args - Either an array of property 
 * names to pick, or a filtering function to determine inclusion.
 * @returns {Object} A new object containing only the selected properties
 * from the source object.
 * 
 * @example
 * Picking specific properties by name
 * pick({ id: 1, name: 'productName', size: 500 }, 'id', 'name');
 * { id: 1, name: 'productName'}
 * 
 * Picking properties based on a filtering function
 * pick({ id: 1, name: 'productName', size: 500 }, (key, value) => value >= 500);
 * { size: 500 }
 */
const pick = function() {
  const newObject = {};
  const primaryObject = arguments[0];
  const args = Array.prototype.slice.call(arguments);
  const argsToPick = args.slice(1);
  if (typeof(args[1]) !== 'function' && Object.keys(primaryObject).length !== 0) {
      argsToPick.forEach(key => {
      newObject[key] = primaryObject[key];
    });
  } else {
    const filterFn = args[1];
    Object.keys(primaryObject).forEach(key => {
      const val = primaryObject[key];
      const toInclude = filterFn(key, val);
      if (toInclude) {
        newObject[key] = primaryObject[key];
      }
    });
  }
  
  return newObject;
};

/**
 * Recursively checks if two objects are equal.
 *
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} Returns `true` if the objects are  equal, `false` otherwise.
 * 
 * @example
 * isEqual({id: 1, name: 'productName'}, {id: 1, name: 'productName'});
 * true
 * isEqual({id: 1, category: { name: 'Other'}}, {id: 1, category: { name: 'Other'}});
 * true
 * isEqual({id: 1}, {id: 1, category: { name: 'Other'}});
 * false
 */
const isEqual = (obj1, obj2) => {
  
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const key of obj1Keys) {
    if (!(key in obj2) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

module.exports = {
  parseJSON,
  get,
  pick,
  isEqual
};