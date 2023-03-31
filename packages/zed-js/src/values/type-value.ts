import { EncodeStream } from '../encode-stream.js';
import { TypeType } from '../types/type-type.js';
import { Type } from '../types/types.js';
import { isNull } from '../utils/is-null.js';
import { Value } from './types.js';

export class TypeValue implements Value {
  type: typeof TypeType = TypeType;

  constructor(public value: Type | null = null) {}

  isUnset() {
    return isNull(this.value);
  }

  toString() {
    if (isNull(this.value)) return 'null';
    return this.value.toString();
  }

  serialize(stream: EncodeStream) {
    if (isNull(this.value)) {
      return null;
    } else {
      return this.value.serialize(stream);
    }
  }

  toJS() {
    if (isNull(this.value)) return null;
    return this.toString();
  }
}
