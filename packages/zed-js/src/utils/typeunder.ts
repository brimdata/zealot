import { Any } from '../index.js';
import { TypeAlias } from '../types/type-alias.js';

export function typeunder(value: Any): Any {
  if (value instanceof TypeAlias) {
    return typeunder(value.type);
  } else {
    return value;
  }
}
