const { expect } = require('chai');
const proxyquire = require('proxyquire');

const objectUtils = proxyquire.noCallThru().load('../../../../plugin_utils/cartridge/scripts/objectUtils', {
  'dw/system/Logger': require('../../../mocks/dw/system/Logger'),
});

const { parseJSON, get } = objectUtils;

describe('parseJSON function', () => {

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

describe('get function', () => {
  it('nested property using dot notation', () => {
    const obj = {
      addressBook: {
        preferredAddress: {
          city: 'Prague'
        }
      }
    };
    const result = get(obj, 'addressBook.preferredAddress.city');
    expect(result).to.equal('Prague');
  });

  it('retrieve a property from an array using square brackets', () => {
    const obj = {
      pageMetaTags: [
        { ID: '123' },
        { ID: '456' }
      ]
    };
    const result = get(obj, 'pageMetaTags[0].ID');
    expect(result).to.equal('123');
  });

  it('return undefined for non-existing properties', () => {
    const obj = {
      addressBook: {
        preferredAddress: {
          city: 'Amsterdam'
        }
      }
    };
    const result = get(obj, 'nonExistentProperty');
    expect(result).to.be.undefined;
  });

  it('return undefined for incorrect array index', () => {
    const obj = {
      pageMetaTags: [
        { ID: '123' },
        { ID: '456' }
      ]
    };
    const result = get(obj, 'pageMetaTags[2].ID');
    expect(result).to.be.undefined;
  });
});
