import { Bool } from '../values/bool.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfBool extends BasePrimitive<Bool> {
  name = 'bool';

  create(value: string) {
    return new Bool(value);
  }
}

export const TypeBool = new TypeOfBool();
