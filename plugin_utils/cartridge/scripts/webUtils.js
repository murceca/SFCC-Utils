/**
 * Set of utils for working with web/http in SFCC.
 * @module webUtils
 */

const Cookie = require('dw/web/Cookie');
const Cookies = require('dw/web/Cookies');

/**
 * Sets a new cookie with the specified name, value, and options.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {Object} [options] - Additional options for the cookie.
 * @param {string} [options.path] - The path for which the cookie is valid.
 * @param {number} [options.maxAge] - The maximum age of the cookie in seconds.
 * @returns {dw.web.Cookie} The created cookie.
 */
const setCookie = (name, value, options) => {
  const cookie = new Cookie(name, value);

  if (options) {
    if (options.path) {
      cookie.setPath(options.path);
    }
    if (options.maxAge !== undefined) {
      cookie.setMaxAge(options.maxAge);
    }
  }

  response.addHttpCookie(cookie);

  return cookie;
};

/**
 * Retrieves a cookie by its name from the current request.
 *
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {dw.web.Cookie|null} The retrieved cookie or null if not found.
 */
const getCookie = (cookieName) => {
  let cookie = null;
  const cookies = request.getHttpCookies();
  const cookieCount = cookies.getCookieCount();

  if (cookies) {
    for (let cookieIndex = 0; cookieIndex < cookieCount; cookieIndex++) {
      let currentCookie = cookies[cookieIndex];
      if (currentCookie.getName() === cookieName) {
        cookie = currentCookie;
        break;
      }
    }
  }

  return cookie;
};

/**
 * Deletes a cookie with the specified name.
 *
 * @param {string} name - The name of the cookie to delete.
 * @returns {dw.web.Cookie} The deleted cookie.
 */
const deleteCookie = (name) => {
  return setCookie(name, '', { maxAge: 0 });
};

module.exports = {
  setCookie,
  getCookie,
  deleteCookie
};