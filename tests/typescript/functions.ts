export function unusedArgs(a: number, b: number, _c: unknown): number {
  return a + b;
}

export function restSiblings(obj: {
  readonly a: number;
  readonly b: number;
}): number {
  const { a, ...rest } = obj;
  return rest.b;
}

export function unusedCaughtError(): string {
  try {
    throw new Error();
  } catch (_e) {
    return "yay";
  }
}
