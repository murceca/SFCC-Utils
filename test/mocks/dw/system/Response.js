class Response {
  constructor() {
    this.cookies = [];
  }

  addHttpCookie(cookie) {
    this.cookies.push(cookie);
  }
}

module.exports = Response;