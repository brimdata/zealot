import * as zjson from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { EncodeStream } from '../encode-stream.js';
import { Field } from '../index.js';
import { Value } from '../values/types.js';
import { TypeAlias } from './type-alias.js';
import { TypeArray } from './type-array.js';
import { TypeMap } from './type-map.js';
import { PrimitiveType } from './type-primitives.js';
import { TypeRecord } from './type-record.js';
import { TypeSet } from './type-set.js';
import { TypeUnion } from './type-union.js';

export type ZedType =
  | PrimitiveType
  | TypeRecord
  | TypeArray
  | TypeSet
  | TypeUnion
  | TypeMap
  | TypeAlias;

export type SerializeTypeDefs = {
  [key: string]: zjson.Type;
};

export interface Type {
  toString(): string;
  serialize(stream: EncodeStream): zjson.NoId<zjson.Type> | zjson.PrimitiveType;
  create(value: zjson.Value, stream: DecodeStream, parent?: Field): Value;
  kind: string;
}
