/**
 * 対話型インターフェース
 */

import { createInterface } from "node:readline/promises";
import type { DetectedDependencies } from "../oxlint/detect";

export interface InteractiveResult {
  typescript: boolean;
  react: boolean;
  testLibrary: "vitest" | "jest" | false;
  output: string;
}

/**
 * 対話型モードで設定を収集
 */
export async function runInteractive(
  detected: DetectedDependencies,
  defaultOutput: string,
): Promise<InteractiveResult> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\nDetected dependencies:");
    console.log(`  - typescript: ${detected.typescript ? "Yes" : "No"}`);
    console.log(`  - react: ${detected.react ? "Yes" : "No"}`);
    console.log(`  - test library: ${detected.testLibrary || "none"}`);
    console.log("\nConfigure oxlint settings:");

    // TypeScript
    const typescriptAnswer = await rl.question(
      `  Include TypeScript rules? [${detected.typescript ? "Y/n" : "y/N"}]: `,
    );
    const useTypeScript = parseYesNo(typescriptAnswer, detected.typescript);

    // React
    const reactAnswer = await rl.question(
      `  Include React rules? [${detected.react ? "Y/n" : "y/N"}]: `,
    );
    const useReact = parseYesNo(reactAnswer, detected.react);

    // Test library
    const testLibraryDefault = detected.testLibrary || "none";
    const testLibraryAnswer = await rl.question(
      `  Test library (vitest/jest/none) [${testLibraryDefault}]: `,
    );
    const testLibrary = parseTestLibrary(
      testLibraryAnswer,
      detected.testLibrary,
    );

    // Output file
    const outputAnswer = await rl.question(
      `  Output file [${defaultOutput}]: `,
    );
    const output = outputAnswer.trim() || defaultOutput;

    return {
      typescript: useTypeScript,
      react: useReact,
      testLibrary,
      output,
    };
  } finally {
    rl.close();
  }
}

function parseYesNo(input: string, useDefault: boolean): boolean {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return useDefault;
  if (normalized === "y" || normalized === "yes") return true;
  if (normalized === "n" || normalized === "no") return false;
  return useDefault;
}

function parseTestLibrary(
  input: string,
  defaultValue: "vitest" | "jest" | false,
): "vitest" | "jest" | false {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return defaultValue;
  if (normalized === "vitest") return "vitest";
  if (normalized === "jest") return "jest";
  if (normalized === "none") return false;
  return defaultValue;
}
