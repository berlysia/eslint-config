async function someFunction(): Promise<2> {
  return 2;
}

export class Klass {
  value = 1 as const;

  publicMethod(): 1 {
    return this.value;
  }

  async asyncMethod(): Promise<1> {
    return this.value;
  }

  async promiseMethod(): Promise<1 | 2> {
    const sum = 1 + this.value + Math.random();
    return sum > 2.5 ? someFunction() : this.value;
  }

  private privateMethod() {
    return this.value;
  }

  protected protectedMethod(): 1 {
    return this.privateMethod();
  }
}
