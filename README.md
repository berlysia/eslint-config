# @berlysia/eslint-config

> ESLint config for myself

Organization approach is based on https://github.com/antfu/eslint-config ❤

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

in `eslint.config.js`

```js
import berlysia from "@berlysia/eslint-config";

export default berlysia();
```

### opt-in rules for TypeScript

```js
import berlysia from "@berlysia/eslint-config";

export default berlysia({
  tsConfigPath: "./tsconfig.json",
});
```
