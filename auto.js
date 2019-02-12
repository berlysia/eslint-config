const { realpathSync } = require("fs");
const { sync: readPackage } = require("read-pkg-up");

const { pkg } = readPackage({ cwd: realpathSync(process.cwd()) });
const hasIn = (key, name) => {
  for (const x in pkg[key] || {}) {
    if (x === name) return true;
  }
  return false;
};
const keys = ["dependencies", "devDependencies", "peerDependencies"];
const hasInDeps = name => keys.some(k => hasIn(k, name));

module.exports = {
  extends: [
    "@berlysia",
    hasInDeps("jest") && "@berlysia/eslint-config/jest",
    hasInDeps("typescript") && "@berlysia/eslint-config/typescript",
    hasInDeps("flow-bin") && "@berlysia/eslint-config/flowtype",
    hasInDeps("react") && "@berlysia/eslint-config/react",
  ].filter(Boolean),
};
