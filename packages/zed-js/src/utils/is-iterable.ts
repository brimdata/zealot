import { Array } from '../values/array.js';
import { Set } from '../values/set.js';

export function isIterable(value: unknown): value is Array | Set {
  return value instanceof Array || value instanceof Set;
}
