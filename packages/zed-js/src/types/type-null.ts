import { Null } from '../values/null.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfNull extends BasePrimitive<Null> {
  name = 'null';

  create(_value: unknown) {
    return new Null();
  }
}

export const TypeNull = new TypeOfNull();
