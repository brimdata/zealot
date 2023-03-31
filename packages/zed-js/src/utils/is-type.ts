import { isContainerType } from '../types/type-containers.js';
import { isPrimitiveType } from '../types/type-primitives.js';
import { Type } from '../types/types.js';

export function isType(value: unknown): value is Type {
  return isPrimitiveType(value) || isContainerType(value);
}
