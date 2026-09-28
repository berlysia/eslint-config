/**
 * Checks that the ESM and CJS builds produce the same flat config.
 *
 * In the CJS build, require() of an ES-module-only plugin returns its module namespace,
 * so a default import can silently become the namespace instead of the plugin. The
 * plugin then has no rules, and presentRulesOnly drops every rule of that plugin.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

type ConfigItem = {
  name?: string;
  files?: unknown;
  rules?: Record<string, unknown>;
  processor?: unknown;
  plugins?: Record<string, { rules?: Record<string, unknown> } | undefined>;
};
type Berlysia = (options: Record<string, unknown>) => ConfigItem[];

const root = path.resolve(import.meta.dirname, "..");
const options = {
  typescript: { tsConfigPath: "./tsconfig.json" },
  react: true,
  testLibrary: "jest",
  // resolved against this repository's .gitignore
  gitignore: true,
};

function summarize(configs: ConfigItem[]) {
  return configs.map((config) => ({
    name: config.name,
    files: config.files,
    processor:
      typeof config.processor === "string" ? config.processor : undefined,
    rules: Object.keys(config.rules ?? {}),
    plugins: Object.fromEntries(
      Object.entries(config.plugins ?? {}).map(([name, plugin]) => [
        name,
        Object.keys(plugin?.rules ?? {}).length,
      ]),
    ),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- shape of dist/index.js
const esm = (await import(
  pathToFileURL(path.join(root, "dist/index.js")).href
)) as {
  default: Berlysia;
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- shape of dist/index.cjs
const cjs = createRequire(import.meta.url)(
  path.join(root, "dist/index.cjs"),
) as {
  default: Berlysia;
};

const esmSummary = JSON.stringify(summarize(esm.default(options)), null, 1);
const cjsSummary = JSON.stringify(summarize(cjs.default(options)), null, 1);

if (esmSummary === cjsSummary) {
  console.log("ESM and CJS builds produce the same config");
} else {
  const esmLines = esmSummary.split("\n");
  const cjsLines = cjsSummary.split("\n");
  const firstDiff = esmLines.findIndex(
    (line, index) => line !== cjsLines[index],
  );
  console.error("ESM and CJS builds differ, first difference:");
  console.error(
    esmLines.slice(Math.max(0, firstDiff - 5), firstDiff + 5).join("\n"),
  );
  console.error("---");
  console.error(
    cjsLines.slice(Math.max(0, firstDiff - 5), firstDiff + 5).join("\n"),
  );
  process.exitCode = 1;
}
