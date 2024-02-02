function Cookies() {
  const storage = [];

  storage.getCookieCount = () => storage.length;

  return storage;
}

module.exports = Cookies;