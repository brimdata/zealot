import { Primitive } from '../values/primitive.js';

export function isPrimitive(value: unknown): value is Primitive {
  return value instanceof Primitive;
}
