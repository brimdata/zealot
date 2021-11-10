import { Context } from "../index";
import * as zjson from "../../zjson";
import { TypeDefs } from "../context";
import { isNull, typeId } from "../utils";
import { Union } from "../values/union";
import { TypeNull } from "./type-null";
import {
  ContainerTypeInterface,
  SerializeTypeDefs,
  ZedTypeInterface,
} from "./types";

type UnionValue = [string, zjson.Value] | null;
export class TypeUnion implements ContainerTypeInterface {
  kind = "union";
  id?: number | string;

  constructor(public types: ZedTypeInterface[]) {}

  static stringify(types: ZedTypeInterface[]) {
    return `(${types.map(typeId).join(",")})`;
  }

  create(value: zjson.UnionValue, typedefs: TypeDefs) {
    if (value === null) {
      return new Union(this, TypeNull, null, null);
    } else {
      const index = parseInt(value[0]);
      const innerType = this.types[index];
      const innerValue = innerType.create(value[1], typedefs);
      return new Union(this, innerType, index, innerValue);
    }
  }

  serialize(typedefs: SerializeTypeDefs): zjson.UnionType {
    return {
      kind: "union",
      types: this.types.map((t) => t.serialize(typedefs)),
    };
  }

  hasTypeType(ctx: Context) {
    return this.types.some((t) => ctx.hasTypeType(t));
  }

  walkTypeValues(
    ctx: Context,
    value: UnionValue,
    visit: (name: string) => void
  ) {
    if (isNull(value)) return;

    const index = parseInt(value[0]);
    const innerType = this.types[index] as ZedTypeInterface;
    const innerValue = value[1];

    if (value === null) ctx.walkTypeValues(innerType, innerValue, visit);
  }

  toString() {
    return `(${this.types.map((t) => t.toString()).join(",")})`;
  }
}
