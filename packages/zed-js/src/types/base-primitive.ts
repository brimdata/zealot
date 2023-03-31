import * as zjson from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { Value } from '../values/types.js';
import { Type } from './types.js';

export abstract class BasePrimitive<_T> implements Type {
  kind = 'primitive';
  abstract name: string;
  abstract create(value: zjson.Value, stream: DecodeStream): Value;

  serialize(): zjson.PrimitiveType {
    return { kind: 'primitive', name: this.name };
  }

  toString() {
    return this.name;
  }
}
