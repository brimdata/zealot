import { Field, TypeRecord } from "../index";
import { zjson } from "../../index";
import { Value } from "../../zjson";
import { TypeDefs, ZedContext } from "../context";
import { ZedValueInterface } from "../values/types";
import {
  ContainerTypeInterface,
  SerializeTypeDefs,
  ZedType,
  ZedTypeInterface,
} from "./types";

export class TypeAlias implements ContainerTypeInterface {
  kind = "alias";
  name: string;
  type: ZedTypeInterface;
  id?: string | number;

  constructor(name: string, type: ZedTypeInterface) {
    this.name = name;
    this.type = type;
  }

  static stringify(name: string, type: ZedTypeInterface) {
    return name + "=(" + type.toString() + ")";
  }

  create(value: Value, typedefs: TypeDefs, parent?: Field) {
    let v: ZedValueInterface;
    if (this.type instanceof TypeRecord || this.type instanceof TypeAlias) {
      v = this.type.create(value, typedefs, parent);
    } else {
      v = this.type.create(value, typedefs);
    }
    v.type = this; // a better way to do this?
    return v;
  }

  serialize(typedefs: SerializeTypeDefs): zjson.Type {
    if (this.name in typedefs) {
      return { kind: "typename", name: this.name };
    } else {
      const type = this.type.serialize(typedefs);
      typedefs[this.name] = type;
      return { kind: "typedef", name: this.name, type };
    }
  }

  hasTypeType() {
    return true;
  }

  walkTypeValues(ctx: ZedContext, value: Value, visit: (name: string) => void) {
    ctx.walkTypeValues(this.type, value, visit);
  }

  toString() {
    return this.name + "=(" + this.type.toString() + ")";
  }
}
