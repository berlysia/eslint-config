export async function fetchValue(): Promise<number> {
  return 1;
}

export function run(): void {
  // expect: typescript/no-floating-promises
  fetchValue();
}

export async function awaitPlain(): Promise<number> {
  // expect: typescript/await-thenable
  return await 1;
}
