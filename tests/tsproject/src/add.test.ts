import { test, expect } from "@jest/globals";
import { add } from "./add";

test("add", () => {
  expect(add(2, 3)).toBe(5);
});
