const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  // extends: ["@repo/eslint-config/nest"],
  ...compat.extends("@repo/eslint-config/nest.js"),
  {
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json", // Point to your local tsconfig.json
        tsconfigRootDir: __dirname,
      },
    },
  },
];
