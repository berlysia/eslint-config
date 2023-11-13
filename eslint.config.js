import berlysia from "./dist/index.js";

const configs = berlysia(
  {
    typescript: {
      tsConfigPath: "./tsconfig.json",
    },
  },
  { ignores: ["dist/**/*", "tests/**/*"] },
);

export default configs;
