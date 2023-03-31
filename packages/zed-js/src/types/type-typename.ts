import { Typename } from '../values/typename.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfTypename extends BasePrimitive<Typename> {
  name = 'typename';

  create(value: string) {
    return new Typename(value);
  }
}

export const TypeTypename = new TypeOfTypename();
