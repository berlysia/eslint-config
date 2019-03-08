export function unusedArgs(a: number, b: number, _c: unknown): number {
  return a + b;
}

export function restSiblings(obj: { a: number; b: number }): number {
  const { a, ...rest } = obj;
  return rest.b;
}

export function unusedCaughtError() {
  try {
    throw new Error();
  } catch (_e) {
    return "yay";
  }
}
