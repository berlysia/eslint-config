# @berlysia/eslint-config

> ESLint config for myself

Organization approach is based on https://github.com/antfu/eslint-config ❤

## Features

- React
- TypeScript
- prettier

## Install

```sh
npm install --save-dev eslint @berlysia/eslint-config
```

```sh
yarn add --dev eslint @berlysia/eslint-config
```

```sh
pnpm add --dev eslint @berlysia/eslint-config
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

## oxlint

The same rule set can be exported as an [oxlint](https://oxc.rs/docs/guide/usage/linter) config. Rules that oxlint does not implement are left out.

```sh
pnpm add --save-dev oxlint @berlysia/eslint-config
pnpm exec berlysia-eslint-oxlint
```

This writes `.oxlintrc.json`. TypeScript, React and the test library (vitest / jest) are detected from your dependencies; run `berlysia-eslint-oxlint --help` for the flags to override detection.

### Type-aware rules and TypeScript 7

typescript-eslint needs the JavaScript API of the `typescript` package, which TypeScript 7 no longer ships. With TypeScript 7, use the oxlint config: its type-aware rules run on [oxlint-tsgolint](https://oxc.rs/docs/guide/usage/linter/type-aware), which is built on TypeScript 7 itself.

```sh
pnpm add --save-dev oxlint oxlint-tsgolint @berlysia/eslint-config
pnpm exec berlysia-eslint-oxlint --type-aware
```

Type-aware rules are also turned on automatically when `oxlint-tsgolint` is installed.

The config generator can also be called from code:

```js
import { writeOxlintConfig } from "@berlysia/eslint-config/oxlint";

await writeOxlintConfig({ typescript: true, typeAware: true });
```
