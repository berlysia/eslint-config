import { test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

test("Counter", () => {
  render(<Counter initial={1} />);
  screen.getByRole("button");
});
