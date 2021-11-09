import { PrimitiveType, Value } from "../../zjson";
import { ZedValueInterface } from "../values/types";
import { ZedTypeInterface } from "./types";

export abstract class BasePrimitive<T> implements ZedTypeInterface {
  kind = "primitive";
  abstract name: string;
  abstract create(value: Value, typedefs?: object): ZedValueInterface;

  serialize(): PrimitiveType {
    return { kind: "primitive", name: this.name };
  }

  toString() {
    return this.name;
  }
}
