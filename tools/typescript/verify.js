const withType = require("../../typescript-with-type");
const withoutType = require("../../typescript-without-type");
const extract = require("./extract");

const withTypeRules = extract(true);
const withoutTypeRules = extract(false);

function getDifferences(required, defined) {
  const result = {
    defined: [],
    missing: [],
  };
  for (const rule of required) {
    if (!rule.startsWith("@typescript-eslint")) continue;
    if (defined.includes(rule)) {
      result.defined.push(rule);
    } else {
      result.missing.push(rule);
    }
  }
  return result;
}

const resultWithTypeRules = getDifferences(
  withTypeRules,
  Object.keys(withType.rules)
);
const resultWithoutTypeRules = getDifferences(
  withoutTypeRules,
  Object.keys(withoutType.rules)
);

const withTypeInWithoutType = getDifferences(
  withTypeRules,
  Object.keys(withoutType.rules)
).defined;

const withoutTypeInWithType = getDifferences(
  withoutTypeRules,
  Object.keys(withType.rules)
).defined;

const messages = [];

if (resultWithTypeRules.missing.length > 0) {
  messages.push(
    `Missing rules with type:\n${resultWithTypeRules.missing.join("\n")}`
  );
}
if (resultWithoutTypeRules.missing.length > 0) {
  messages.push(
    `Missing rules without type:\n${resultWithoutTypeRules.missing.join("\n")}`
  );
}

if (withTypeInWithoutType.length > 0) {
  messages.push(
    `Misdefined rules with type in without type:\n${withTypeInWithoutType.join(
      "\n"
    )}`
  );
}

if (withoutTypeInWithType.length > 0) {
  messages.push(
    `Misdefined rules without type in with type:\n${withoutTypeInWithType.join(
      "\n"
    )}`
  );
}

if (messages.length > 0) {
  messages.forEach(x => console.error(x, "\n"));
  process.exit(1);
}
