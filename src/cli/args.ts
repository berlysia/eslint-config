/**
 * コマンドライン引数パーサー
 */

import { parseArgs } from "node:util";
import type { CliOptions } from "./types";

const HELP_TEXT = `
Usage: berlysia-eslint-oxlint [options]

Generate .oxlintrc.json configuration file based on project dependencies.

Options:
  -i, --interactive           Run in interactive mode
  --typescript                Enable TypeScript rules (auto-detected by default)
  --no-typescript             Disable TypeScript rules
  --react                     Enable React rules (auto-detected by default)
  --no-react                  Disable React rules
  --test-library <library>    Specify test library (vitest|jest|none)
  --dry-run                   Output to stdout instead of writing file
  -o, --output <file>         Output file path (default: .oxlintrc.json)
  -h, --help                  Display this help message

Examples:
  $ berlysia-eslint-oxlint
  $ berlysia-eslint-oxlint --interactive
  $ berlysia-eslint-oxlint --typescript --react --test-library=vitest
  $ berlysia-eslint-oxlint --no-typescript --no-react
  $ berlysia-eslint-oxlint --dry-run
  $ berlysia-eslint-oxlint -o custom-oxlint.json
`;

export function parseCliArgs(argv: string[]): CliOptions {
  const { values } = parseArgs({
    args: argv,
    options: {
      interactive: {
        type: "boolean",
        short: "i",
        default: false,
      },
      typescript: {
        type: "boolean",
        default: undefined,
      },
      react: {
        type: "boolean",
        default: undefined,
      },
      "test-library": {
        type: "string",
      },
      "dry-run": {
        type: "boolean",
        default: false,
      },
      output: {
        type: "string",
        short: "o",
        default: ".oxlintrc.json",
      },
      help: {
        type: "boolean",
        short: "h",
        default: false,
      },
    },
    allowPositionals: false,
  });

  // test-library validation
  const testLibraryValue = values["test-library"];
  if (
    testLibraryValue &&
    !["vitest", "jest", "none"].includes(testLibraryValue)
  ) {
    throw new Error(
      `Invalid test-library: ${testLibraryValue}. Must be one of: vitest, jest, none`,
    );
  }

  const testLibrary: "vitest" | "jest" | "none" | undefined =
    testLibraryValue === "vitest" ||
    testLibraryValue === "jest" ||
    testLibraryValue === "none"
      ? testLibraryValue
      : undefined;

  return {
    interactive: values.interactive || false,
    typescript: values.typescript,
    react: values.react,
    testLibrary,
    dryRun: values["dry-run"] || false,
    output: values.output || ".oxlintrc.json",
    help: values.help || false,
  };
}

export function showHelp(): void {
  console.log(HELP_TEXT);
}

/**
 * 対話型モードで選択された設定を再現するコマンドラインを生成
 */
export function generateCommandFromOptions(options: {
  typescript: boolean;
  react: boolean;
  testLibrary: "vitest" | "jest" | false;
  output: string;
}): string {
  const args: string[] = ["berlysia-eslint-oxlint"];

  if (!options.typescript) {
    args.push("--no-typescript");
  }
  if (options.react) {
    args.push("--react");
  } else {
    args.push("--no-react");
  }
  if (options.testLibrary) {
    args.push(`--test-library=${options.testLibrary}`);
  } else {
    args.push("--test-library=none");
  }
  if (options.output !== ".oxlintrc.json") {
    args.push(`--output=${options.output}`);
  }

  return args.join(" ");
}
