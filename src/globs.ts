export const GLOB_SRC_EXT = "?([cm])[jt]s?(x)";
export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`;

export const GLOB_JS = "**/*.?([cm])js";
export const GLOB_JSX = "**/*.?([cm])jsx";

export const GLOB_TS = "**/*.?([cm])ts";
export const GLOB_TSX = "**/*.?([cm])tsx";

export const GLOB_TESTS = [
  `**/__(test|spec|perf)s__/**/*.${GLOB_SRC_EXT}`,
  `**/?(*.)+(spec|test|perf).${GLOB_SRC_EXT}`,
];

export const GLOB_IGNORE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/bun.lockb",
  "**/pnpm-lock.yaml",
  "**/output",
  "**/.next",
  "**/.vercel",
  "**/.cache",
  "**/.output",
  "**/CHANGELOG.md",
  "**/*.min.*",
  "**/LICENSE*",
];
