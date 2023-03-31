import { Uint64 } from '../values/uint64.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfUint64 extends BasePrimitive<Uint64> {
  name = 'uint64';

  create(value: string | null) {
    return new Uint64(value);
  }
}

export const TypeUint64 = new TypeOfUint64();
