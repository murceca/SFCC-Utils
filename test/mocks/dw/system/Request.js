class Request {
  constructor() {
      this.httpCookies = null;
  }

  getHttpCookies() {
      return this.httpCookies;
  }
}

module.exports = Request;