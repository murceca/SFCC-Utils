const Iterator = require("./Iterator");

class SeekableIterator extends Iterator {
  close() {
    console.log('SeekableIterator is closed!');
  }
}
module.exports = SeekableIterator;