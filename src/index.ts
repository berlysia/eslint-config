import { showAbsence } from "./presentRulesOnly";

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {},
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "./configs/eslint-core",
    "./configs/eslint-comments",
    "./configs/import",
    "./configs/unicorn",
    "./configs/sonarjs",
    "prettier",
  ],
};

showAbsence();
