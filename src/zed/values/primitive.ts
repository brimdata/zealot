import { isNull } from "../utils";
import { ZedType } from "../types/types";
import { ZedValueInterface } from "./types";

export abstract class Primitive implements ZedValueInterface {
  abstract type: ZedType;
  abstract toJS(): any;

  constructor(public value: string | null = null) {}

  isUnset() {
    return isNull(this.value);
  }

  isSet() {
    return !this.isUnset();
  }

  toString() {
    if (isNull(this.value)) return "null";
    return this.value.toString();
  }

  serialize() {
    if (isNull(this.value)) return null;
    return this.value.toString();
  }
}
