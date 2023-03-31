import * as zjson from '../zjson.js';
import { EncodeStream } from '../encode-stream.js';
import { TypeUnion } from '../types/type-union.js';
import { Type } from '../types/types.js';
import { isNull } from '../utils/is-null.js';
import { Value } from './types.js';

export class Union implements Value {
  constructor(
    public type: TypeUnion,
    public innerType: Type,
    public index: number | null,
    public value: Value | null
  ) {}

  toString() {
    if (isNull(this.value)) return 'null';
    return this.value.toString();
  }

  serialize(stream: EncodeStream) {
    if (isNull(this.index) || isNull(this.value)) return null;
    return [
      this.index.toString(),
      stream.encodeValue(this.value),
    ] as zjson.UnionValue;
  }

  isUnset() {
    return isNull(this.index) || isNull(this.value);
  }

  toJS() {
    if (this.isUnset()) return null;
    return this.value?.toJS();
  }
}
