module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "env": {
      "browser": true
    },
    "rules": {
      "camelcase": "off",
      "no-prototype-builtins": "off",
      "quotes": ["error", "double", { "avoidEscape": true }],
      "func-names": ["error", "as-needed"],
      "function-paren-newline": ["error", "consistent"],
     }
};
