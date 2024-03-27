import terminalLink from "terminal-link";
import { clean } from "../clean";
import typescript from "./typescript";
import core from "./core";
import common from "./common";

function linkify({ name, docs }: { name: string; docs?: string }) {
  if (!docs) return name;
  return terminalLink(name, docs);
}

const args = process.argv.slice(2);
const isFix = args.includes("--fix");

const flags = {
  hasMissing: false,
  hasDeprecated: false,
  hasUnknown: false,
};

const deprecatedOrUnknowns = new Set<
  string | { name: string; docs?: string }
>();

const results = [...common(), core()];

for (const result of results) {
  let isInvalid = false;
  const messages: string[] = [];
  if (result.missing.length > 0) {
    isInvalid = true;
    flags.hasMissing = true;
    messages.push(
      `Missing rules:\n${result.missing.map(linkify).join("\n")}\n`,
    );
  }

  if (result.deprecated.length > 0) {
    isInvalid = true;
    flags.hasDeprecated = true;
    for (const rule of result.deprecated) deprecatedOrUnknowns.add(rule);
    messages.push(
      `Deprecated rules:\n${result.deprecated.map(linkify).join("\n")}\n`,
    );
  }

  if (result.unknown.length > 0) {
    isInvalid = true;
    flags.hasUnknown = true;
    for (const rule of result.unknown) deprecatedOrUnknowns.add(rule);
    messages.push(`Unknown rules:\n${result.unknown.join("\n")}\n`);
  }

  if (isInvalid) {
    console.error(
      `verification for "${result.name}" failed\n${messages.join("\n")}`,
    );
  }
}

{
  let isInvalid = false;
  const result = typescript();
  const messages: string[] = [];
  if (result.withType.missing.length > 0) {
    isInvalid = true;
    messages.push(
      `Missing rules in withType:\n${result.withType.missing.map(linkify).join("\n")}\n`,
    );
  }

  if (result.withType.deprecated.length > 0) {
    isInvalid = true;
    flags.hasDeprecated = true;
    for (const rule of result.withType.deprecated)
      deprecatedOrUnknowns.add(rule);
    messages.push(
      `Deprecated rules in withType:\n${result.withType.deprecated
        .map(linkify)
        .join("\n")}\n`,
    );
  }

  if (result.withType.unknown.length > 0) {
    isInvalid = true;
    flags.hasUnknown = true;
    for (const rule of result.withType.unknown) deprecatedOrUnknowns.add(rule);
    messages.push(
      `Unknown rules in withType:\n${result.withType.unknown.join("\n")}\n`,
    );
  }

  if (result.withoutType.missing.length > 0) {
    isInvalid = true;
    messages.push(
      `Missing rules in withoutType:\n${result.withoutType.missing
        .map(linkify)
        .join("\n")}\n`,
    );
  }

  if (result.withoutType.deprecated.length > 0) {
    isInvalid = true;
    flags.hasDeprecated = true;
    for (const rule of result.withoutType.deprecated)
      deprecatedOrUnknowns.add(rule);
    messages.push(
      `Deprecated rules in withoutType:\n${result.withoutType.deprecated
        .map(linkify)
        .join("\n")}\n`,
    );
  }

  if (result.withoutType.unknown.length > 0) {
    isInvalid = true;
    flags.hasUnknown = true;
    for (const rule of result.withoutType.unknown)
      deprecatedOrUnknowns.add(rule);
    messages.push(
      `Unknown rules in withoutType:\n${result.withoutType.unknown.join(
        "\n",
      )}\n`,
    );
  }

  if (isInvalid) {
    console.error(
      `verification for "${result.name}" failed\n${messages.join("\n")}`,
    );
  }
}

if (isFix && !flags.hasMissing && (flags.hasDeprecated || flags.hasUnknown)) {
  clean(
    new Set(
      [...deprecatedOrUnknowns].map((rule) =>
        typeof rule === "string" ? rule : rule.name,
      ),
    ),
  );
  flags.hasDeprecated = false;
  flags.hasUnknown = false;
}

if (flags.hasMissing || flags.hasUnknown || flags.hasDeprecated) {
  throw new Error("Some rules are missing, unknown or deprecated.");
}
