import { Bytes } from '../values/bytes.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfBytes extends BasePrimitive<Bytes> {
  name = 'bytes';

  create(value: string) {
    return new Bytes(value);
  }
}

export const TypeBytes = new TypeOfBytes();
