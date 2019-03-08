export function assert(value: boolean, message?: string): void {
  if (value) return;
  throw new Error(message || "Assertion Error");
}
