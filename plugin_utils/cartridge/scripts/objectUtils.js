const Logger = require('dw/system/Logger');

/**
 * Parses stringified JSON value. Never throws any exceptions,
 * but outputs JSON parsing errors into logs.
 * 
 * @param {string} jsonString - JSON string.
 * @returns {object|null} - Parsed JSON value or `null`.
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
 * @param {object} obj - The object from which to retrieve the property.
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
}

/**
 * Creates a new object by picking specific properties from a source object
 * based on either a list of property names or a filtering function.
 * 
 * @param {object} primaryObject - The source object from which 
 * properties will be picked.
 * @param {...(string|function)} args - Either an array of property 
 * names to pick, or a filtering function to determine inclusion.
 * @returns {object} - A new object containing only the selected properties
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
  if (typeof(args[1]) !== 'function') {
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
}

module.exports = {
  parseJSON,
  get,
  pick
};