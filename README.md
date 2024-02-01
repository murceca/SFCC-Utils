# **SFCC-Utils**
SFCC-Utils cartridge is a set of utilities, which may be useful for a typical SFCC (Salesforce Commerce Cloud) project.

The provided utils completes SFCC API and simplifies a routine development tasks.

All the utils are covered by unit tests using Chai/Mocha.

## **List of utils**

`plugin_utils/cartridge/scripts/arrayUtils`

  - [unique](https://murceca.github.io/SFCC-Utils/global.html#unique)
  - [flatten](https://murceca.github.io/SFCC-Utils/global.html#flatten)
  - [difference](https://murceca.github.io/SFCC-Utils/global.html#difference)

`plugin_utils/cartridge/scripts/objectUtils`

  - [parseJSON](https://murceca.github.io/SFCC-Utils/global.html#parseJSON)
  - [get](https://murceca.github.io/SFCC-Utils/global.html#get)
  - [pick](https://murceca.github.io/SFCC-Utils/global.html#pick)
  - [isEqual](https://murceca.github.io/SFCC-Utils/global.html#isEqual)

`plugin_utils/cartridge/scripts/webUtils`

  - [setCookie](https://murceca.github.io/SFCC-Utils/global.html#setCookie)
  - [getCookie](https://murceca.github.io/SFCC-Utils/global.html#getCookie)
  - [deleteCookie](https://murceca.github.io/SFCC-Utils/global.html#deleteCookie)

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