class Pin {
  protected component: any;
  protected read: string;
  protected write?: string;

  constructor(component: any, read: string, write?: string) {
    this.component = component;
    this.read = read;
    this.write = write;
  }

  public read_digital() {
    return this.component[this.read]();
  }

  public write_digital(set: boolean) {
    if (typeof this.write !== "undefined") {
      this.component[this.write](set);
    } else {
      return -1;
    }
  }
}
