import { Int8 } from '../values/int8.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfInt8 extends BasePrimitive<Int8> {
  name = 'int8';

  create(value: string | null) {
    return new Int8(value);
  }
}

export const TypeInt8 = new TypeOfInt8();
