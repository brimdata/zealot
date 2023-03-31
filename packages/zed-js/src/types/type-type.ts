import * as zjson from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { TypeValue } from '../values/type-value.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfType extends BasePrimitive<TypeValue> {
  name = 'type';

  create(value: zjson.Type | null, stream: DecodeStream): TypeValue {
    return new TypeValue(value === null ? null : stream.decodeType(value));
  }
}

export const TypeType = new TypeOfType();
