# @berlysia/eslint-config

> ESLint config for myself

## Features

- React
- TypeScript
- prettier

## Install

```sh
$ yarn add --dev eslint @berlysia/eslint-config
```

```sh
$ npm install --save-dev eslint @berlysia/eslint-config
```

## Config

in `.eslintrc`

```json
{
  "extends": ["@berlysia/eslint-config/auto"]
}
```

### opt-in rules for TypeScript

```json
{
  "extends": [
    "@berlysia/eslint-config/auto"
    "@berlysia/eslint-config/typescript-with-type"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Manual Config

in `.eslintrc`

```json
{
  "extends": [
    "@berlysia" // base
  ],
  "overrides": [
    {
      "files": [
        "*.{test,spec}.{js,ts,jsx,tsx}",
        "**/__tests__/**/*.{js,ts,jsx,tsx}"
      ],
      "extends": "@berlysia/eslint-config/jest"
    },
    {
      "files": ["*.{ts,tsx}"],
      "extends": "@berlysia/eslint-config/typescript-without-type"
    },
    {
      "files": ["*.{ts,tsx}"],
      "extends": "@berlysia/eslint-config/typescript-with-type",
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    }
  ]
}
```
