module.exports = {
  extends: [
    "../index.js",
    "../jest.js",
    /* eslint-find-rulesがscopedなpluginに対応していない */
    // "../typescript.js",
    "../flowtype.js",
    "../react.js",
  ],
};
