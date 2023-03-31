import { Any } from '../index.js';
import { Union } from '../values/union.js';

export function baseValue(value: Any | null): Any | null {
  if (value instanceof Union) {
    return baseValue(value.value);
  }
  return value;
}
