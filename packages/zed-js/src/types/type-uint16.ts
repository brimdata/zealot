import { Uint16 } from '../values/uint16.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfUint16 extends BasePrimitive<Uint16> {
  name = 'uint16';

  create(value: string | null) {
    return new Uint16(value);
  }
}

export const TypeUint16 = new TypeOfUint16();
