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
    return undefined;
  }
}

module.exports = {
  parseJSON
};