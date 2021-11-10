import { isNull } from "../utils";
import { TypeUint16 } from "../types/type-uint16";
import { Primitive } from "./primitive";

export class Uint16 extends Primitive {
  type = TypeUint16;

  toInt() {
    if (isNull(this.value)) return null;
    return parseInt(this.value);
  }

  toJS() {
    return this.toInt();
  }
}
