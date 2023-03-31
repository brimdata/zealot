import { Net } from '../values/net.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfNet extends BasePrimitive<Net> {
  name = 'net';

  create(value: string) {
    return new Net(value);
  }
}

export const TypeNet = new TypeOfNet();
