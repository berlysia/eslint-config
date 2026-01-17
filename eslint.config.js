import berlysia from "./dist/index.js";

const configs = berlysia(
  {
    typescript: {
      tsConfigPath: "./tsconfig.json",
    },
  },
  { ignores: ["dist/**/*", "tests/**/*"] },
);

export default [
  ...configs,
  {
    files: ["src/cli/index.ts"],
    rules: {
      "node/hashbang": "off",
      "unicorn/prefer-top-level-await": "off",
    },
  },
];
