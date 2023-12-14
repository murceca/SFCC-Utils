const { expect } = require('chai');
const proxyquire = require('proxyquire');

const mockLogger = {
  error: () => {}
};

const objectUtilsWithMockLogger = proxyquire.noCallThru().load('../../../../plugin_utils/cartridge/scripts/objectUtils', {
  'dw/system/Logger': mockLogger,
});

describe('parseJSON function', () => {
  it('parse a simple string', () => {
    const { parseJSON } = objectUtilsWithMockLogger;
    const actualResult = parseJSON('{"countryCode":"CZ"}');
    expect(actualResult).to.deep.eql({ "countryCode": "CZ" });
  });

  it('an empty string', () => {
    const { parseJSON } = objectUtilsWithMockLogger;
    const actualResult = parseJSON('');
    expect(actualResult).to.be.null;
  });

  it('invalid JSON', () => {
    const { parseJSON } = objectUtilsWithMockLogger;
    const jsonString = 'invalid-json';
    const actualResult = parseJSON(jsonString);
    expect(actualResult).to.be.null;
  });

  it('null input', () => {
    const { parseJSON } = objectUtilsWithMockLogger;
    const actualResult = parseJSON(null);
    expect(actualResult).to.be.null;
  });

  it('undefined input', () => {
    const { parseJSON } = objectUtilsWithMockLogger;
    const actualResult = parseJSON(undefined);
    expect(actualResult).to.be.null;
  });
});
