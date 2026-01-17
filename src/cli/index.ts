#!/usr/bin/env node
/**
 * oxlint設定ファイル生成CLI
 */

import { writeFile } from "node:fs/promises";
import { detectDependencies } from "../oxlint/detect";
import { generateOxlintConfig } from "../oxlint/generator";
import { generateCommandFromOptions, parseCliArgs, showHelp } from "./args";
import { runInteractive } from "./interactive";

void (async () => {
  try {
    const options = parseCliArgs(process.argv.slice(2));

    // Show help if requested
    if (options.help) {
      showHelp();
      process.exit(0);
    }

    // Detect dependencies
    const detected = detectDependencies();

    // Run interactive mode or use provided/detected options
    const finalOptions = options.interactive
      ? await runInteractive(detected, options.output)
      : {
          typescript: options.typescript ?? detected.typescript,
          react: options.react ?? detected.react,
          testLibrary:
            options.testLibrary === "none"
              ? false
              : (options.testLibrary ?? detected.testLibrary),
          output: options.output,
        };

    // Generate oxlint config
    const config = generateOxlintConfig({
      typescript: finalOptions.typescript,
      react: finalOptions.react,
      testLibrary: finalOptions.testLibrary,
    });

    const configJson = `${JSON.stringify(config, null, 2)}\n`;

    // Output to stdout or file
    if (options.dryRun) {
      console.log(configJson);
    } else {
      await writeFile(finalOptions.output, configJson, "utf8");
      console.log(`\nGenerated ${finalOptions.output}`);

      // Show command to reproduce if interactive mode was used
      if (options.interactive) {
        const reproducibleCommand = generateCommandFromOptions(finalOptions);
        console.log(
          `\nTo reproduce this configuration without interactive mode:\n  ${reproducibleCommand}\n`,
        );
      }
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
})();
