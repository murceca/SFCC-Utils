const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const Collection = require('../../../mocks/dw/util/Collection');

const iteratorUtils = proxyquire.noCallThru().load(
  '../../../../plugin_utils/cartridge/scripts/iteratorUtils',
  {
    'dw/util/SeekableIterator': require('../../../mocks/dw/util/SeekableIterator'),
  }
);

const { forEach, map, filter, reduce } = iteratorUtils;

describe('iteratorUtils', () => {
  describe('forEach function', () => {
    it('should call callback for each item in the collection', () => {
      const fakeData = new Collection();
      fakeData.add('item1', 'item2', 'item3');

      const result = [];
      const callback = item => result.push(item[4]);
      const callbackSpy = sinon.spy(callback);
      forEach(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(3);
      expect(result).to.deep.equal(['1', '2', '3']);
    });

    it('should handle empty collection', () => {
      const fakeData = new Collection();
      const result = [];

      const callback = item => result.push(item[4]);
      const callbackSpy = sinon.spy(callback);
      forEach(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(0);
      expect(result.length).to.equal(0);
    });

    it('should handle object data', () => {
      const fakeData = new Collection();
      fakeData.add(
        { product: 'ProductName1', quantity: 40 },
        { product: 'ProductName2', quantity: 25 },
        { product: 'ProductName3', quantity: 35 }
      );
      let result = [];

      const callback = (item) => {
        return result.push(item.quantity);
      };
      const callbackSpy = sinon.spy(callback);
      forEach(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(3);
      expect(result).to.deep.equal([40, 25, 35]);
    });
  });

  describe('map function', () => {
    it('should call callback for each item in the collection and return new array', () => {
      const fakeData = new Collection();
      fakeData.add('item1', 'item2', 'item3');

      const callback = item => item.replace('item', 'product');
      const callbackSpy = sinon.spy(callback);
      const result = map(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(3);
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(['product1', 'product2', 'product3']);
    });

    it('should handle empty collection', () => {
      const fakeData = new Collection();

      const callback = item => item.length >= 4;
      const callbackSpy = sinon.spy(callback);
      const result = map(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(0);
      expect(result.length).to.equal(0);
    });

    it('should handle object data', () => {
      const fakeData = new Collection();
      fakeData.add(
        { product: 'ProductName1', quantity: 40 },
        { product: 'ProductName2', quantity: 80 },
        { product: 'ProductName3', quantity: 25 },
        { product: 'ProductName4', quantity: 67 }
      );

      const callback = item => item.quantity + 20;
      const callbackSpy = sinon.spy(callback);
      const result = map(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(4);
      expect(result).to.deep.equal([60, 100, 45, 87]);
    });
  });

  describe('filter function', () => {
    it('should call callback for each item in the collection and return new array', () => {
      const fakeData = new Collection();
      fakeData.add('item1', 'product1', 'description1');

      const callback = item => item.length === 5;
      const callbackSpy = sinon.spy(callback);
      const result = filter(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(3);
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(['item1']);
    });

    it('should handle empty collection', () => {
      const fakeData = new Collection();

      const callback = item => item.length >= 4;
      const callbackSpy = sinon.spy(callback);
      const result = filter(fakeData.iterator(), callbackSpy);

      expect(callbackSpy.callCount).to.be.equal(0);
      expect(result.length).to.equal(0);
    });

    it('should handle object data', () => {
      const fakeData = new Collection();
      fakeData.add(
        { product: 'ProductName1', quantity: 40, isAvailable: true },
        { product: 'ProductName2', quantity: 80, isAvailable: false },
        { product: 'ProductName3', quantity: 25, isAvailable: true },
        { product: 'ProductName4', quantity: 67, isAvailable: false }
      );

      const callback = item => item.isAvailable;
      const callbackSpy = sinon.spy(callback);
      const result = filter(fakeData.iterator(), callbackSpy);
      const actualResult = [
        { product: 'ProductName1', quantity: 40, isAvailable: true },
        { product: 'ProductName3', quantity: 25, isAvailable: true }
      ];

      expect(callbackSpy.callCount).to.be.equal(4);
      expect(result).to.deep.equal(actualResult);
    });
  });

  describe('reduce function', () => {
    it('should call callback for each item in the collection and return sum', () => {
      const fakeData = new Collection();
      fakeData.add(1, 2, 3, 4);

      const callback = (accumulator, item) => {
        return accumulator + item;
      };
      const result = reduce(fakeData.iterator(), callback, 0);
      expect(result).to.equal(10);
    });

    it('should correctly handle reducing with no initial value', () => {
      const fakeData = new Collection();
      fakeData.add(1, 2, 3, 4);

      const callback = (accumulator, item) => {
        return accumulator + item;
      };
      const result = reduce(fakeData.iterator(), callback);
      expect(result).to.equal(10);
    });

    it('should correctly handle reducing with empty collection', () => {
      const fakeData = new Collection();

      const callback = (accumulator, item) => {
        return accumulator + item.quantity;
      };
      const result = reduce(fakeData.iterator(), callback);
      expect(result).to.equal(undefined); 
    });

    it('should correctly handle reducing object data', () => {
      const fakeData = new Collection();
      fakeData.add(
        { product: 'ProductName1', quantity: 40 },
        { product: 'ProductName2', quantity: 25 },
        { product: 'ProductName3', quantity: 35 }
      );

      const callback = (accumulator, item) => {
        return accumulator + item.quantity;
      };
      const result = reduce(fakeData.iterator(), callback, 0);
      expect(result).to.equal(100);
    });
  });

});