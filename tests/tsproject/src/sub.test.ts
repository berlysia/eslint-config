import { test, expect } from "@jest/globals";
import { sub } from "./sub";

test("sub", () => {
  expect(sub(2, 3)).toBe(-1);
});
