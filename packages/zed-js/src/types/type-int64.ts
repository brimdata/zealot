import { Int64 } from '../values/int64.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfInt64 extends BasePrimitive<Int64> {
  name = 'int64';

  create(value: string | null) {
    return new Int64(value);
  }
}

export const TypeInt64 = new TypeOfInt64();
