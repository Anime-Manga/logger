import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticJs from "@stylistic/eslint-plugin-js";
import parserTs from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {
    languageOptions: {
      globals: globals.node,
      parser: parserTs
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylisticJs
    },
    rules: {
      //syntax code
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      
      //syntax code + plugin
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/array-bracket-newline": ["error", { "multiline": true }],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/dot-location": ["error", "object"],
      "@stylistic/keyword-spacing": ["error", { "before": true }],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/semi": "error",
      "@stylistic/wrap-regex": "error"
    }
  }
];