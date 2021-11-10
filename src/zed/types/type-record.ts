import { isNull } from "../utils";
import * as zjson from "../../zjson";
import { TypeDefs, ZedContext } from "../context";
import { typeId } from "../utils";
import { Field } from "../values/field";
import { Record } from "../values/record";
import {
  ContainerTypeInterface,
  SerializeTypeDefs,
  ZedType,
  ZedTypeInterface,
} from "./types";
import { Null, trueType } from "../index";
import { ZedValueInterface } from "../values/types";
import { values } from "lodash";

export type TypeField = {
  name: string;
  type: ZedTypeInterface;
};

export class TypeRecord implements ContainerTypeInterface {
  kind = "record";
  fields: TypeField[] | null;
  id?: string | number;

  constructor(fields: TypeField[] | null) {
    this.fields = fields;
  }

  has(name: string) {
    return !!this.fields?.find((f) => f.name === name);
  }

  static stringify(fields: TypeField[] | null) {
    if (isNull(fields)) return "null";
    let s = "{";
    let sep = "";
    fields.forEach((f) => {
      // XXX need to check if name has funny chars
      s += sep + f.name + ":" + typeId(f.type);
      sep = ",";
    });
    s += "}";
    return s;
  }

  toString() {
    if (isNull(this.fields)) return "null";
    let s = "{";
    let sep = "";
    this.fields.forEach((f) => {
      s += sep + f.name + ":" + f.type.toString();
      sep = ",";
    });
    s += "}";
    return s;
  }

  create(values: zjson.Value, typedefs: TypeDefs, parent?: Field) {
    if (values === null || isNull(this.fields)) return new Record(this, null);
    const record = new Record(this, null /* temp */);
    // If a parent was passed in, then we are constructing a nested record
    // and the parent is a Field. If no parent, then we are creating the
    // root record and the parent is this record.
    const progenitor = parent || record; // just needed another variable name for parent

    record.fields = this.fields.map((f, i) => {
      if (trueType(f.type) instanceof TypeRecord) {
        const field = new Field(f.name, new Null() /* temp */, progenitor);
        field.value = f.type.create(values[i], typedefs, field);
        return field;
      } else {
        return new Field(
          f.name,
          f.type.create(values[i], typedefs),
          progenitor
        );
      }
    });
    return record;
  }

  serialize(typedefs: SerializeTypeDefs): zjson.RecordType {
    return {
      kind: "record",
      fields: isNull(this.fields)
        ? null
        : this.fields.map((f) => {
            return {
              name: f.name,
              type: f.type.serialize(typedefs),
            };
          }),
    };
  }

  hasTypeType(ctx: ZedContext) {
    if (isNull(this.fields)) return false;
    return this.fields.some((f) => ctx.hasTypeType(f.type));
  }

  walkTypeValues(
    ctx: ZedContext,
    values: zjson.Value[] | null,
    visit: (name: string) => void
  ) {
    if (isNull(values)) return;
    if (isNull(this.fields)) return;

    this.fields.forEach((f, i) => {
      ctx.walkTypeValues(f.type, values[i], visit);
    });
  }
}
