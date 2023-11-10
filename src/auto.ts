import { isPackageExists } from "local-pkg";
import { showAbsence } from "./presentRulesOnly";

const hasInDeps = (name: string) => isPackageExists(name);

module.exports = {
  extends: ["./", hasInDeps("react") && "./configs/react"].filter(Boolean),
  overrides: [
    hasInDeps("jest") && {
      files: [
        "*.{test,spec}.{js,ts,jsx,tsx}",
        "**/__tests__/**/*.{js,ts,jsx,tsx}",
      ],
      extends: "./configs/jest",
    },
    hasInDeps("typescript") && {
      files: ["*.{ts,tsx}"],
      extends: "./configs/typescript-without-type",
    },
    hasInDeps("jest") &&
      hasInDeps("typescript") && {
        files: [
          "*.{test,spec}.{js,ts,jsx,tsx}",
          "**/__tests__/**/*.{js,ts,jsx,tsx}",
        ],
        extends: "./configs/jest-and-typescript",
      },
  ].filter(Boolean),
};

showAbsence();
