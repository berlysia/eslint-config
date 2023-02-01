export function unusedArguments(a: number, b: number, _c: unknown): number {
  return a + b;
}

export function restSiblings(object: {
  readonly a: number;
  readonly b: number;
}): number {
  const { a, ...rest } = object;
  return rest.b;
}

export function unusedCaughtError(): string {
  try {
    throw new Error("msg");
  } catch {
    return "yay";
  }
}
