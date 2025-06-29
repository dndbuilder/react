import { fileURLToPath } from 'node:url';
import path from 'node:path';
import tsParser from '@typescript-eslint/parser';
import jsModule from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const { configs: jsConfigs } = jsModule;

// Get the directory name of the current module (ESM equivalent of __dirname)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: jsConfigs.recommended,
  allConfig: jsConfigs.all,
});

export default [
  ...compat.config({
    extends: ["@repo/eslint-config/library.js"],
  }),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
  },
];
