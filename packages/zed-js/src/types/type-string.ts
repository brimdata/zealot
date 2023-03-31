import { String } from '../values/string.js';
import { BasePrimitive } from './base-primitive.js';
export class TypeOfString extends BasePrimitive<String> {
  name = 'string';

  create(value: string) {
    return new String(value);
  }
}

export const TypeString = new TypeOfString();
