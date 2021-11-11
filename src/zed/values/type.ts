import { TypeType } from "../types/type-type";
import { ZedTypeInterface } from "../types/types";
import { isNull, typeId } from "../utils";
import { ZedValueInterface } from "./types";

export class TypeValue implements ZedValueInterface {
  type: typeof TypeType = TypeType;

  constructor(public value: ZedTypeInterface | null = null) {}

  isUnset() {
    return isNull(this.value);
  }

  toString() {
    if (isNull(this.value)) return "null";
    return this.value.toString();
  }

  serialize() {
    if (isNull(this.value)) return null;
    else return typeId(this.value);
  }

  toJS() {
    if (isNull(this.value)) return null;
    return this.toString();
  }
}
