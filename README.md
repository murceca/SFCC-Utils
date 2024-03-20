# **SFCC-Utils**
SFCC-Utils cartridge is a set of utilities, which may be useful for a typical SFCC (Salesforce Commerce Cloud) project.

The provided utils completes SFCC API and simplifies a routine development tasks.

All the utils are covered by unit tests using Chai/Mocha.

## **How to use**

1. Add the "plugin_utils" cartridge to your project.
2. If you would like to use dependency injection via SFCC "modules" shorthand, then also add the "modules" folder.
3. Upload the updated code version on your SFCC instance.
4. Inject required module using CommonJS `require('*/cartridge/scripts/<UTIL_MODULE_NAME>')` or `require('sfcc-utils/<UTIL_MODULE_NAME>')` if you're using dependency injection via SFCC "modules" shorthand.

## **List of utils**

`plugin_utils/cartridge/scripts/arrayUtils` OR `sfcc-utils/array`

  - [unique](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#unique)
  - [flatten](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#flatten)
  - [difference](https://murceca.github.io/SFCC-Utils/module-arrayUtils.html#difference)

`plugin_utils/cartridge/scripts/objectUtils` OR `sfcc-utils/object`

  - [parseJSON](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#parseJSON)
  - [get](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#get)
  - [pick](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#pick)
  - [isEqual](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#isEqual)
  - [deepClone](https://murceca.github.io/SFCC-Utils/module-objectUtils.html#deepClone)

`plugin_utils/cartridge/scripts/webUtils` OR `sfcc-utils/web`

  - [setCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#setCookie)
  - [getCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#getCookie)
  - [deleteCookie](https://murceca.github.io/SFCC-Utils/module-webUtils.html#deleteCookie)

`plugin_utils/cartridge/scripts/iteratorUtils` OR `sfcc-utils/iterator`

  - [forEach](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#forEach)
  - [map](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#map)
  - [filter](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#filter)
  - [reduce](https://murceca.github.io/SFCC-Utils/module-iteratorUtils.html#reduce)

`plugin_utils/cartridge/scripts/collectionUtils` OR `sfcc-utils/collection`

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
// Dependency injection via SFCC "modules" shorthand
const { isEqual } = require('sfcc-utils/object');

isEqual({id: 1, category: { name: 'Other'}}, {id: 1, category: { name: 'Other'}});
// true
```

```
// Dependency injection via SFCC "modules" shorthand
const { filter } = require('sfcc-utils/collection');

const czAddresses = filter(
  customer.addressBook.addresses,
  address => address.countryCode.value === 'CZ'
);
```