import { Duration } from '../values/duration.js';
import { BasePrimitive } from './base-primitive.js';

export class TypeOfDuration extends BasePrimitive<Duration> {
  name = 'duration';

  create(value: string) {
    return new Duration(value);
  }
}

export const TypeDuration = new TypeOfDuration();
