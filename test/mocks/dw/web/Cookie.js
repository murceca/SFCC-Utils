class Cookie {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.path = '';
    this.maxAge = -1;
  }

  setPath(path) {
    this.path = path;
  }

  setMaxAge(maxAge) {
    this.maxAge = maxAge;
  }

  getName() {
    return this.name;
  }
}

module.exports = Cookie;