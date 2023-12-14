const { unique, flatten, difference } = require(
  '../../../../plugin_utils/cartridge/scripts/arrayUtils'
);
const { expect } = require('chai');

describe('unique function with optional callback', () => {

  it('empty array', () => {
    expect(unique([])).to.eql([]);
  });

  it('array with single element', () => {
    expect(unique(['CZ'])).to.eql(['CZ']);
  });

  it('all unique elements', () => {
    expect(unique(['DE', 'BE', 'CZ'])).to.eql(['DE', 'BE', 'CZ']);
  });

  it('all non-unique elements', () => {
    expect(unique(['CZ', 'CZ', 'CZ'])).to.eql(['CZ']);
  });

  it('string values', () => {
    const expectedResult = [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ];
    const actualResult = unique(['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE']);
    expect(actualResult).to.eql(expectedResult);
  });

  it('number values', () => {
    const expectedResult = [ 10, 4, 42, 0, -42, 8];
    const actualResult = unique([10, 4, 42, 0, 10, -42, 4, 8, 0, 8]);
    expect(actualResult).to.eql(expectedResult);
  });

  it('mixed primitive values', () => {
    const expectedResult = [
      10, 'DE', true, 42, null, 0, -42, 'ES', false
    ];
    const actualResult = unique([
      10, 'DE', true, 42, null, 0, 10, -42, 'DE', 'ES', 0, 'ES', null, true, false
    ]);
    expect(actualResult).to.eql(expectedResult);
  });

  it('unique function with callback and array', () => {
    const expectedResult = ['DE', 'CZ', 'NL', 'DK'];
    const actualResult = ['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE'];
    const callback = item => item[1];
    const result = unique(actualResult, callback);
    expect(result).to.deep.equal(expectedResult);
  });

  it('unique function with callback and array of objects', () => {
    const expectedResult = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Doe' }
    ];
    const actualResult =  [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
      { id: 3, name: 'Doe' }
    ];
    const callback = item => item.id;
    const result = unique(actualResult, callback);
    expect(result).to.deep.equal(expectedResult);
  });
});

describe('flatten function', () => {

  it('flatten a nested array', () => {
    const actualResult = flatten([1, [2, 3], [4, [5, 6]]]);
    const expectedResult = [1, 2, 3, 4, 5, 6];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('empty arrays', () => {
    const actualResult = flatten([]);
    const expectedResult = [];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('arrays with mixed elements', () => {
    const actualResult = flatten([1, 'a', [2, 'b', true], [3, [-4, 'c']]]);
    const expectedResult = [1, 'a', 2, 'b', true, 3, -4, 'c'];
    expect(actualResult).to.deep.equal(expectedResult);
  });
});

describe('difference function', () => {

  it('an array and two arrays', () => {
    const actualResult = difference(
      ['DE', 'CZ', 'GB', 'DK'],
      ['DE', 'BE'],
      ['DK', 'NL', 'EE']
    );
    const expectedResult = ['CZ', 'GB'];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('an empty array and two arrays', () => {
    const actualResult = difference(
      [],
      ['DE', 'BE'],
      ['DK', 'NL', 'EE']
    );
    const expectedResult = [];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('arrays with duplicate elements', () => {
    const actualResult = difference(
      ['DE', 'CZ', 'UK', 'GB', 'DK', 'DK', 'DE', 'DE'],
      ['DE', 'BE'],
      ['DK', 'NL', 'EE']
    );
    const expectedResult = [ 'CZ', 'UK', 'GB' ];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('non-array arguments', () => {
    const actualResult = difference(
      ['DE', 'CZ', 'DK', 'UK', 'GB', 'DK', 'NL'],
      'non-array-element',
      ['DK', 'NL', 'EE']
    );
    const expectedResult = [ 'DE', 'CZ', 'UK', 'GB' ];
    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('duplicates elements in primary array', () => {
    const actualResult = difference(
      ['DE', 'CZ', 'CZ', 'CZ', 'DK', 'UK', 'GB', 'GB', 'DK', 'NL', 'GB'],
      ['DE', 'BE', 'UK'],
      ['DK', 'NL', 'EE', 'US']
    );
    const expectedResult = [ 'CZ', 'CZ', 'CZ', 'GB', 'GB', 'GB' ];
    expect(actualResult).to.deep.equal(expectedResult);
  });

});