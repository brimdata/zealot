import { isContainer } from './is-container.js';
import { isPrimitive } from './is-primitive.js';

export function isValue(value: unknown) {
  return isPrimitive(value) || isContainer(value);
}
