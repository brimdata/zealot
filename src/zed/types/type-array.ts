/* eslint-disable @typescript-eslint/no-array-constructor */
import * as zjson from "../../zjson";
import { TypeDefs, ZedContext } from "../context";
import { isNull, typeId } from "../utils";
import { Array } from "../values/array";
import {
  ContainerTypeInterface,
  SerializeTypeDefs,
  ZedTypeInterface,
} from "./types";

export class TypeArray implements ContainerTypeInterface {
  id?: number | string;
  kind = "array";
  type: ZedTypeInterface;

  constructor(type: ZedTypeInterface) {
    this.type = type;
  }

  static stringify(type: ZedTypeInterface) {
    return `[${typeId(type)}]`;
  }

  create(values: zjson.ArrayValue | null, typedefs: TypeDefs) {
    return new Array(
      this,
      isNull(values)
        ? null
        : values.map((value) => this.type.create(value, typedefs))
    );
  }

  serialize(typedefs: SerializeTypeDefs) {
    return {
      kind: "array",
      type: this.type.serialize(typedefs),
    } as zjson.ArrayType;
  }

  hasTypeType(ctx: ZedContext) {
    return ctx.hasTypeType(this.type);
  }

  walkTypeValues(
    ctx: ZedContext,
    value: zjson.ArrayValue,
    visit: (name: string) => void
  ) {
    if (isNull(value)) return;
    value.map((v) => ctx.walkTypeValues(this.type, v, visit));
  }

  toString() {
    return "[" + this.type.toString() + "]";
  }
}
