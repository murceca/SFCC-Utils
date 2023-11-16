const Logger = require('dw/system/Logger');

/**
 * Parses stringified JSON value. Never throws any exceptions,
 * but outputs JSON parsing errors into logs.
 * @param {string} jsonString - JSON string
 * @returns {object|null} parsed JSON value or `null`
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

module.exports = {
  parseJSON
};