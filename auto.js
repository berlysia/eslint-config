const { realpathSync } = require("fs");
const { sync: readPackage } = require("read-pkg-up");

const { packageJson: pkg } = readPackage({ cwd: realpathSync(process.cwd()) });
const hasIn = (key, name) => {
  for (const x in pkg[key] || {}) {
    if (x === name) return true;
  }
  return false;
};
const keys = ["dependencies", "devDependencies", "peerDependencies"];
const hasInDeps = (name) => keys.some((k) => hasIn(k, name));

module.exports = {
  extends: ["./", hasInDeps("react") && "./react"].filter(Boolean),
  overrides: [
    hasInDeps("jest") && {
      files: [
        "*.{test,spec}.{js,ts,jsx,tsx}",
        "**/__tests__/**/*.{js,ts,jsx,tsx}",
      ],
      extends: "./jest",
    },
    hasInDeps("typescript") && {
      files: ["*.{ts,tsx}"],
      extends: "./typescript-without-type",
    },
    hasInDeps("jest") &&
      hasInDeps("typescript") && {
        files: [
          "*.{test,spec}.{js,ts,jsx,tsx}",
          "**/__tests__/**/*.{js,ts,jsx,tsx}",
        ],
        extends: "./jest-and-typescript",
      },
  ].filter(Boolean),
};
