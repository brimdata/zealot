import {
  Array,
  Primitive,
  Set,
  TypeAlias,
  TypeRecord,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
} from "./index";
import { BasePrimitive } from "./types/base-primitive";
import primitives, {
  PrimitiveName,
  PrimitiveTypes,
} from "./types/type-primitives";
import { ZedTypeInterface } from "./types/types";
import { BString } from "./values/bstring";
import { Duration } from "./values/duration";
import { Float64 } from "./values/float64";
import { Int16 } from "./values/int16";
import { Int32 } from "./values/int32";
import { Int64 } from "./values/int64";
import { Int8 } from "./values/int8";
import { String } from "./values/string";
import { Time } from "./values/time";
import { ZedInt } from "./values/types";

export function typeId(type: ZedTypeInterface) {
  if (type instanceof BasePrimitive) {
    return type.name;
  }
  if (type instanceof TypeAlias) {
    return type.name;
  }
  if (type.id) {
    return type.id.toString();
  }
  throw new Error("Does not have an id");
}

export function isAlias(name: string | number) {
  // an alias is a non-integer string
  return isNaN(name as any);
}

export function isInt(value: unknown): value is ZedInt {
  return (
    value instanceof Int64 ||
    value instanceof Int32 ||
    value instanceof Int16 ||
    value instanceof Int8 ||
    value instanceof Uint64 ||
    value instanceof Uint32 ||
    value instanceof Uint16 ||
    value instanceof Uint8
  );
}

export function isTime(value: unknown): value is Time {
  return value instanceof Time;
}

export function isTypeAlias(type: ZedTypeInterface): type is TypeAlias {
  return type instanceof TypeAlias;
}

export function isNamed(type: ZedTypeInterface, name: string) {
  return isTypeAlias(type) && type.name === name;
}

export function trueType<T extends ZedTypeInterface>(
  start: ZedTypeInterface
): T {
  let t = start;
  while (isTypeAlias(t)) {
    t = t.type;
  }
  return t as T;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isStringy(value: unknown): value is String | BString {
  return value instanceof String || value instanceof BString;
}

export function isDuration(value: unknown): value is Duration {
  return value instanceof Duration;
}

export function isFloat64(value: unknown): value is Float64 {
  return value instanceof Float64;
}

export function getPrimitiveType(name: PrimitiveName) {
  return primitives[name] as PrimitiveTypes;
}

export function isPrimitive(value: unknown): value is Primitive {
  return value instanceof Primitive;
}

export function isPrimitiveName(name: string): name is PrimitiveName {
  return name in primitives;
}

export function isIterable(value: unknown): value is Array | Set {
  return value instanceof Array || value instanceof Set;
}

export function flatColumns(
  record: TypeRecord,
  columns: (string | string[])[] = [],
  path: string[] | undefined = undefined
) {
  if (isNull(record.fields)) return [];
  for (let f of record.fields) {
    const type = trueType(f.type);
    if (type instanceof TypeRecord) {
      flatColumns(type, columns, !path ? [f.name] : [...path, f.name]);
    } else {
      columns.push(path ? [...path, f.name] : f.name);
    }
  }
  return columns;
}
