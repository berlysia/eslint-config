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
const hasInDeps = name => keys.some(k => hasIn(k, name));
const flatMap = (arr, fn) => arr.reduce((a, i) => a.concat(fn(i)), []);

module.exports = {
  extends: [
    "./",
    hasInDeps("flow-bin") && "./flowtype",
    hasInDeps("react") && "./react",
  ].filter(Boolean),
  overrides: [
    hasInDeps("jest") && {
      files: flatMap(["test", "spec"], testName =>
        flatMap(
          ["js", "ts", "jsx", "tsx"],
          extName => `*.${testName}.${extName}`
        )
      ),
      extends: "./jest",
    },
    hasInDeps("typescript") && {
      files: flatMap(["ts", "tsx"], extName => `*.${extName}`),
      extends: "./typescript-without-type",
    },
  ].filter(Boolean),
};
