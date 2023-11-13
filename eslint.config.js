import berlysia from "./dist/index.js";

const configs = berlysia(
  {
    typescript: {
      tsConfigPath: "./tsconfig.json",
    },
  },
  { ignores: ["dist/**/*", "tests/**/*"] },
  {
    files: ["*.ts"],
    rules: {
      "import/no-import-module-exports": "off",
      "unicorn/prefer-module": "off",
      "unicorn/no-empty-file": "off",
    },
  },
);

export default configs;
