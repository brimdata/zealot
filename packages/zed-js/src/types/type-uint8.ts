import { Uint8 } from '../values/uint8.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfUint8 extends BasePrimitive<Uint8> {
  name = 'uint8';

  create(value: string | null) {
    return new Uint8(value);
  }
}

export const TypeUint8 = new TypeOfUint8();
