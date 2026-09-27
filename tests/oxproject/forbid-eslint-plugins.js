// Preloaded while running the config generator. In TypeScript 7 projects the
// `typescript` package has no compiler API, so loading typescript-eslint (or any
// ESLint plugin that pulls it in) crashes. The generator must work from rule data only.
import { registerHooks } from "node:module";

const forbidden =
  /^(?:typescript|ts-api-utils|@typescript-eslint\/|eslint-plugin-|@eslint\/|@eslint-community\/|@vitest\/eslint-plugin)/;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (forbidden.test(specifier)) {
      throw new Error(
        `oxlint config generation must not load "${specifier}" (imported from ${context.parentURL})`,
      );
    }
    return nextResolve(specifier, context);
  },
});
