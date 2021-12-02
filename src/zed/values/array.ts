import { TypeArray } from "../types/type-array";
import { isNull } from "../utils";
import { Value } from "./types";

export class Array implements Value {
  constructor(public type: TypeArray, public items: Value[] | null) {}

  indexOf(value: Value) {
    if (isNull(this.items)) return -1;
    return this.items.indexOf(value);
  }

  at(index: number) {
    if (isNull(this.items)) return undefined;
    return this.items[index];
  }

  toString() {
    if (isNull(this.items)) return "null";
    const contents = this.items.map((i) => i.toString()).join(",");
    return `[${contents}]`;
  }

  serialize() {
    if (isNull(this.items)) return null;
    return this.items.map((i) => i.serialize());
  }

  isUnset() {
    return isNull(this.items);
  }

  toJS() {
    if (isNull(this.items)) return null;
    return this.items.map((i) => i.toJS());
  }
}
