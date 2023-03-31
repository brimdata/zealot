import { Ip } from '../values/ip.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfIp extends BasePrimitive<Ip> {
  name = 'ip';

  create(value: string) {
    return new Ip(value);
  }
}

export const TypeIp = new TypeOfIp();
