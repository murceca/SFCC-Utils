const { expect } = require('chai');
const proxyquire = require('proxyquire');

const objectUtils = proxyquire.noCallThru().load('../../../../plugin_utils/cartridge/scripts/objectUtils', {
  'dw/system/Logger': require('../../../mocks/dw/system/Logger'),
});

describe('parseJSON function', () => {
  const { parseJSON } = objectUtils;

  it('parse a simple string', () => {
    const actualResult = parseJSON('{"countryCode":"CZ"}');
    expect(actualResult).to.deep.eql({ "countryCode": "CZ" });
  });

  it('an empty string', () => {
    const actualResult = parseJSON('');
    expect(actualResult).to.be.null;
  });

  it('invalid JSON', () => {
    const jsonString = 'invalid-json';
    const actualResult = parseJSON(jsonString);
    expect(actualResult).to.be.null;
  });

  it('null input', () => {
    const actualResult = parseJSON(null);
    expect(actualResult).to.be.null;
  });

  it('undefined input', () => {
    const actualResult = parseJSON(undefined);
    expect(actualResult).to.be.null;
  });
});
