module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "error",

    "@typescript-eslint/semi": ["error"],
    semi: "off",

    quotes: ["error", "double", { avoidEscape: true }],
    "prefer-const": "error",
    "space-before-function-paren": [
      "error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],

    curly: ["off", "multi"],
    "array-bracket-newline": ["error", { multiline: true }],
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
    "no-multiple-empty-lines": "off",

    eqeqeq: ["off", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-expressions": "error",

    "spaced-comment": ["error", "never"],
    camelcase: ["warning"],
  },
};
