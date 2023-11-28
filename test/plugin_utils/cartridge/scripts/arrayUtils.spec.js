const { unique } = require(
  '../../../../plugin_utils/cartridge/scripts/arrayUtils'
);
const { expect } = require('chai');

describe('unique', () => {

  it('empty array', () => {
    expect(unique([])).to.eql([]);
  });

  it('string values', () => {
    const expectedResult = [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ];
    const actualResult = unique(['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE']);
    expect(actualResult).to.eql(expectedResult);
  });

  it('number values', () => {
    const expectedResult = [10, 4, 42, 0, 10, -42, 4, 8, 0, 8];
    const actualResult = unique([ 10, 4, 42, 0, -42, 8]);
    expect(actualResult).to.eql(expectedResult);
  });

  it('mixed primitive values', () => {
    const expectedResult = [
      10, 'DE', true, 42, null, 0, -42, 'ES', 8, false
    ];
    const actualResult = unique([
      10, 'DE', true, 42, null, 0, 10, -42, 'DE', 'ES', 0, 'ES', null, true, false
    ]);
    expect(actualResult).to.eql(expectedResult);
  });

});