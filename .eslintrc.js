module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:mocha/recommended"
    ],
    "overrides": [],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "mocha"
    ],
    "globals": {
        "response": "readonly",
        "request": "readonly"
    },
    "rules": {
        "semi": ["error", "always"],
        "mocha/no-mocha-arrows": 0
    },
    "ignorePatterns": ["jsdocs"]
};
