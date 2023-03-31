import { Time } from '../values/time.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfTime extends BasePrimitive<Time> {
  name = 'time';

  create(value: string) {
    return new Time(value);
  }
}

export const TypeTime = new TypeOfTime();
