import { clean } from "../clean";
import typescript from "./typescript";
import core from "./core";
import common from "./common";

const args = process.argv.slice(2);
const isFix = args.includes("--fix");

type Result = ReturnType<typeof common>[number];
const results = [...common(), core()];

const result = results.reduce<Result>(
  (acc, { missing, unknown, deprecated }) => {
    return {
      missing: [...acc.missing, ...missing],
      unknown: [...acc.unknown, ...unknown],
      deprecated: [...acc.deprecated, ...deprecated],
    };
  },
  { missing: [], unknown: [], deprecated: [] }
);

let flag = {
  hasMissing: false,
  hasUnknown: false,
  hasDeprecated: false,
};

if (result.missing.length > 0) {
  flag.hasMissing = true;
  console.error(`Missing rules:\n${result.missing.join("\n")}\n`);
}

if (result.deprecated.length > 0) {
  flag.hasDeprecated = true;
  console.error(`Deprecated rules:\n${result.deprecated.join("\n")}\n`);
}

if (result.unknown.length > 0) {
  flag.hasUnknown = true;
  console.error(`Unknown rules:\n${result.unknown.join("\n")}\n`);
}

const tsResult = typescript();
if (tsResult.withType.missing.length > 0) {
  flag.hasMissing = true;
  console.error(
    `Missing rules in withType:\n${tsResult.withType.missing.join("\n")}\n`
  );
}

if (tsResult.withType.deprecated.length > 0) {
  flag.hasDeprecated = true;
  console.error(
    `Deprecated rules in withType:\n${tsResult.withType.deprecated.join(
      "\n"
    )}\n`
  );
}

if (tsResult.withType.unknown.length > 0) {
  flag.hasUnknown = true;
  console.error(
    `Unknown rules in withType:\n${tsResult.withType.unknown.join("\n")}\n`
  );
}

if (tsResult.withoutType.missing.length > 0) {
  flag.hasMissing = true;
  console.error(
    `Missing rules in withoutType:\n${tsResult.withoutType.missing.join(
      "\n"
    )}\n`
  );
}

if (tsResult.withoutType.deprecated.length > 0) {
  flag.hasDeprecated = true;
  console.error(
    `Deprecated rules in withoutType:\n${tsResult.withoutType.deprecated.join(
      "\n"
    )}\n`
  );
}

if (tsResult.withoutType.unknown.length > 0) {
  flag.hasUnknown = true;
  console.error(
    `Unknown rules in withoutType:\n${tsResult.withoutType.unknown.join(
      "\n"
    )}\n`
  );
}

if (isFix && !flag.hasMissing && (flag.hasDeprecated || flag.hasUnknown)) {
  clean(
    new Set([
      ...result.deprecated,
      ...result.unknown,
      ...tsResult.withType.deprecated,
      ...tsResult.withType.unknown,
      ...tsResult.withoutType.deprecated,
      ...tsResult.withoutType.unknown,
    ])
  );
  flag.hasDeprecated = false;
  flag.hasUnknown = false;
}

if (flag.hasMissing || flag.hasUnknown || flag.hasDeprecated) {
  throw new Error("Some rules are missing, unknown or deprecated.");
}
