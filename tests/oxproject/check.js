// Generates .oxlintrc.json with the package CLI and checks that oxlint (with the
// TypeScript 7 based oxlint-tsgolint) accepts it and reports the expected diagnostics.
// `// expect: <plugin>/<rule>` marks a diagnostic expected on the next line, and
// `// expect-not: <plugin>/<rule>` marks one that must not be reported there.
import { execFileSync, spawnSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

execFileSync(
  process.execPath,
  [
    "--import=./forbid-eslint-plugins.js",
    "../../dist/cli/index.js",
    "--typescript",
    "--type-aware",
    "--react",
    "--test-library=vitest",
    "--output=.oxlintrc.json",
  ],
  { stdio: "inherit" },
);

const result = spawnSync(
  path.join("node_modules", ".bin", "oxlint"),
  ["--format=json", "src"],
  { encoding: "utf8", shell: process.platform === "win32" },
);
if (result.error) {
  throw result.error;
}
if (result.stdout.trim() === "") {
  console.error(result.stderr);
  throw new Error(
    "oxlint produced no report; the generated config may be invalid",
  );
}

const report = JSON.parse(result.stdout);
const actual = new Set(
  report.diagnostics.map((diagnostic) => {
    const ruleId = diagnostic.code.replace(/^(.+)\((.+)\)$/, "$1/$2");
    // file-level diagnostics have no labels
    const line = diagnostic.labels[0]?.span.line ?? 0;
    return `${diagnostic.filename}:${line}:${ruleId}`;
  }),
);

const failures = [];
for (const file of readdirSync("src", { recursive: true })) {
  const filename = path.posix.join("src", String(file).replaceAll("\\", "/"));
  if (!/\.[cm]?[jt]sx?$/.test(filename)) continue;
  const lines = readFileSync(filename, "utf8").split("\n");
  for (const [index, line] of lines.entries()) {
    const match = /\/\/ (expect|expect-not): (\S+)/.exec(line);
    if (!match) continue;
    const key = `${filename}:${index + 2}:${match[2]}`;
    if ((match[1] === "expect") !== actual.has(key)) {
      failures.push(`${match[1]} ${key}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Unmet expectations:\n" + failures.join("\n"));
  console.error("Reported:\n" + [...actual].join("\n"));
  process.exit(1);
}
console.log(`oxproject: all expectations met (${actual.size} diagnostics)`);
