import { BString } from '../values/bstring.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfBString extends BasePrimitive<BString> {
  name = 'bstring';

  create(value: string) {
    return new BString(value);
  }
}

export const TypeBString = new TypeOfBString();
