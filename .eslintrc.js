const config = require("./prettier");
module.exports = Object.assign({}, config, {
  env: {
    node: true
  },
  rules: Object.assign({}, config.rules, {
    "import/no-commonjs": "off",
  })
});
