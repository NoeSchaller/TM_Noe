"use strict";
class Pin {
    constructor(component, read, write) {
        this.component = component;
        this.read = read;
        this.write = write;
    }
    read_digital() {
        return this.component[this.read]();
    }
    write_digital(set) {
        if (typeof this.write !== "undefined") {
            this.component[this.write](set);
        }
        else {
            return -1;
        }
    }
}
