import { Field } from "../index";
import * as zjson from "../../zjson";
import { TypeDefs, ZedContext } from "../context";
import { ZedValueInterface } from "../values/types";
import { TypeAlias } from "./type-alias";
import { TypeArray } from "./type-array";
import { TypeMap } from "./type-map";
import { PrimitiveTypes } from "./type-primitives";
import { TypeRecord } from "./type-record";
import { TypeSet } from "./type-set";
import { TypeUnion } from "./type-union";

export type ZedType =
  | PrimitiveTypes
  | TypeRecord
  | TypeArray
  | TypeSet
  | TypeUnion
  | TypeMap
  | TypeAlias;

export type SerializeTypeDefs = {
  [key: string]: zjson.Type;
};

export interface ZedTypeInterface {
  id?: string | number;
  toString(): string;
  serialize(typedefs: SerializeTypeDefs): zjson.Type;
  create(
    value: zjson.Value,
    typedefs: TypeDefs,
    parent?: Field
  ): ZedValueInterface;
}

export interface ContainerTypeInterface extends ZedTypeInterface {
  hasTypeType(ctx: ZedContext): boolean;
  walkTypeValues(
    context: ZedContext,
    value: zjson.Value,
    visit: (name: string) => void
  ): void;
}
