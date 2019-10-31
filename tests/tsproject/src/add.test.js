const { add } = require("./add");

test("add", () => {
  expect(add(2, 3)).toBe(5);
});
