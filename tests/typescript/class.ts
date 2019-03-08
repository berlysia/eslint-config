async function someFn(): Promise<2> {
  return 2;
}

export class Klass {
  value: 1 = 1;

  publicMethod() {
    return this.value;
  }

  async asyncMethod(): Promise<1> {
    return this.value;
  }

  async promiseMethod() {
    const sum = 1 + this.value + Math.random();
    return sum > 2.5 ? someFn() : this.value;
  }

  private privateMethod() {
    return this.value;
  }

  protected protectedMethod() {
    return this.privateMethod();
  }
}
