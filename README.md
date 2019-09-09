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

## Manual Config

in `.eslintrc`

```json
{
  "extends": [
    "@berlysia", // base
    "@berlysia/eslint-config/typescript", // TypeScript
    "@berlysia/eslint-config/jest" // jest
  ]
}
```
