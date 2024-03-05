# **SFCC-Utils**
SFCC-Utils cartridge is a set of utilities, which may be useful for a typical SFCC (Salesforce Commerce Cloud) project.

The provided utils completes SFCC API and simplifies a routine development tasks.

All the utils are covered by unit tests using Chai/Mocha.

## **List of utils**

`plugin_utils/cartridge/scripts/arrayUtils`

  - [unique](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#unique)
  - [flatten](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#flatten)
  - [difference](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#difference)

`plugin_utils/cartridge/scripts/objectUtils`

  - [parseJSON](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#parseJSON)
  - [get](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#get)
  - [pick](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#pick)
  - [isEqual](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#isEqual)
  - [deepClone](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#deepClone)

`plugin_utils/cartridge/scripts/webUtils`

  - [setCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#setCookie)
  - [getCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#getCookie)
  - [deleteCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#deleteCookie)

`plugin_utils/cartridge/scripts/iteratorUtils`

  - [forEach](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#forEach)
  - [map](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#map)
  - [filter](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#filter)
  - [reduce](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#reduce)

`plugin_utils/cartridge/scripts/collectionUtils`

  - [forEach](https://murceca.github.io/SFCC-Utils/module-collectionUtils.html#forEach)
  - [map](https://murceca.github.io/SFCC-Utils/module-collectionUtils.html#map)
  - [filter](https://murceca.github.io/SFCC-Utils/module-collectionUtils.html#filter)
  - [reduce](https://murceca.github.io/SFCC-Utils/module-collectionUtils.html#reduce)

## **Usage examples**

```
const { unique } = require('*/cartridge/scripts/arrayUtils');

unique(['DE', 'BE', 'DE', 'CZ', 'NL', 'DK', 'NL', 'EE']);
// [ 'DE', 'BE', 'CZ', 'NL', 'DK', 'EE' ]
```

```
const { isEqual } = require('*/cartridge/scripts/objectUtils');

isEqual({id: 1, category: { name: 'Other'}}, {id: 1, category: { name: 'Other'}});
// true
```

```
const { filter } = require('*/cartridge/scripts/collectionUtils');

const czAddresses = filter(
  customer.addressBook.addresses,
  address => address.countryCode.value === 'CZ'
);
```