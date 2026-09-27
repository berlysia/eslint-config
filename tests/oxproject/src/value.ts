// the test override must not apply to non-test files
// expect-not: vitest/no-focused-tests
describe.only("value", () => {});
