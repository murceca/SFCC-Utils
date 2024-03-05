const { expect } = require('chai');
const proxyquire = require('proxyquire');

const objectUtils = proxyquire.noCallThru().load('../../../../plugin_utils/cartridge/scripts/objectUtils', {
  'dw/system/Logger': require('../../../mocks/dw/system/Logger'),
});

const { parseJSON, get, pick, isEqual, deepClone } = objectUtils;

describe('parseJSON function', () => {
  it('parse a simple string', () => {
    const actualResult = parseJSON('{"countryCode":"CZ"}');
    expect(actualResult).to.deep.equal({ "countryCode": "CZ" });
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
    const sourceObject = {
      addressBook: {
        preferredAddress: {
          city: 'Prague'
        }
      }
    };
    const actualResult = get(sourceObject, 'addressBook.preferredAddress.city');
    expect(actualResult).to.equal('Prague');
  });

  it('retrieve a property from an array using square brackets', () => {
    const sourceObject = {
      pageMetaTags: [
        { ID: '123' },
        { ID: '456' }
      ]
    };
    const actualResult = get(sourceObject, 'pageMetaTags[0].ID');
    expect(actualResult).to.equal('123');
  });

  it('return undefined for non-existing properties', () => {
    const sourceObject = {
      addressBook: {
        preferredAddress: {
          city: 'Amsterdam'
        }
      }
    };
    const actualResult = get(sourceObject, 'nonExistentProperty');
    expect(actualResult).to.be.undefined;
  });

  it('return undefined for incorrect array index', () => {
    const sourceObject = {
      pageMetaTags: [
        { ID: '123' },
        { ID: '456' }
      ]
    };
    const actualResult = get(sourceObject, 'pageMetaTags[2].ID');
    expect(actualResult).to.be.undefined;
  });
});

describe('pick', () => {
  it('specific properties by name', () => {
    const sourceObject = { id: 1, name: 'productName', size: 500 };
    const actualResult = pick(sourceObject, 'id', 'name');
    expect(actualResult).to.deep.equal({ id: 1, name: 'productName' });
  });

  it('with filtering function', () => {
    const sourceObject = { id: 1, name: 'productName', size: 700 };
    const filterFunction = (key, value) => value > 500;
    const actualResult = pick(sourceObject, filterFunction);
    expect(actualResult).to.deep.equal({ size: 700 });
  });

  it('an empty property list', () => {
    const sourceObject = { id: 1, name: 'productName', size: 500 };
    const actualResult = pick(sourceObject);
    expect(actualResult).to.deep.equal({});
  });

  it('an empty object', () => {
    const sourceObject = {};
    const actualResult = pick(sourceObject, 'name', 'size');
    expect(actualResult).to.deep.equal({});
  });

  it('filtering function that includes all properties', () => {
    const sourceObject = { id: 1, name: 'productName', size: 500 };
    const filterFunction = () => true;
    const actualResult = pick(sourceObject, filterFunction);
    expect(actualResult).to.deep.equal(sourceObject);
  });

  it('filtering function that excludes all properties', () => {
    const sourceObject = { id: 1, name: 'productName', size: 500 };
    const filterFunction = () => false;
    const actualResult = pick(sourceObject, filterFunction);
    expect(actualResult).to.deep.equal({});
  });
});

describe('isEqual function', () => {
  it('equal objects', () => {
    const sourceObject1 = { id: 1, name: 'productName', size: 500 };
    const sourceObject2 = { id: 1, name: 'productName', size: 500 };
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.true;
  });

  it('empty objects', () => {
    const sourceObject1 = {};
    const sourceObject2 = {};
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.true;
  });

  it('non-equal objects', () => {
    const sourceObject1 = { id: 1, name: 'productName'};
    const sourceObject2 = { id: 1, name: 'productName', size: 800 };
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.false;
  });

  it('objects with different keys', () => {
    const sourceObject1 = { id: 1, name: 'productName' };
    const sourceObject2 = { id: 1, category: { name: 'Other' } };
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.false;
  });

  it('nested equal objects', () => {
    const sourceObject1 = {id: 1, category: { name: 'Other'}};
    const sourceObject2 = {id: 1, category: { name: 'Other'}};
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.true;
  });

  it('objects with null values', () => {
    const sourceObject1 = { id: 1, name: null };
    const sourceObject2 = { id: 1, name: null };
    const actualResult = isEqual(sourceObject1, sourceObject2);
    expect(actualResult).to.be.true;
  });
});

describe('deepClone function', () => {
  it('return null if input is null', () => {
    const input = null;
    const result = deepClone(input);
    expect(result).to.equal(null);
  });

  it('return undefined if input is undefined', () => {
    const input = undefined;
    const result = deepClone(input);
    expect(result).to.equal(undefined);
  });

  it('return the same value for primitive types', () => {
    const input = 42;
    const result = deepClone(input);
    expect(result).to.equal(input);
  });

  it('deeply clone objects', () => {
    const data = { id: 1, category: { name: 'Dresses' }};
    const clone = deepClone(data);
    data.category.name = 'Shoes';
    expect(clone.category.name).to.equal('Dresses');
  });

  it('deeply clone arrays', () => {
    const data = ['CZ', ['UK', { code: 44}], 'GE'];
    const clone = deepClone(data);
    data[1][1].code = 42;
    expect(clone[1][1].code).to.equal(44);
  });

  it('deeply clone nested objects and arrays', () => {
    const data = { countryCodes: { 
      USA: { code: "US", capital: "Washington D.C.", languages: ["English", "Spanish"] },
      Canada: { code: "CA", capital: "Ottawa", languages: ["English", "French"] },
      UK: { code: "GB", capital: "London", languages: ["English"] },
      CzechRepublic: { code: "CZ", capital: "Prague", languages: ["Czech"] }
    }};
    const clone = deepClone(data);
    data.countryCodes.CzechRepublic.languages.push("German");
    expect(clone.countryCodes.CzechRepublic.languages).to.eql(["Czech"]);
  });
});
