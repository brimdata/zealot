import { getPrimitives, PrimitiveName } from '../types/type-primitives.js';

export function isPrimitiveName(name: string): name is PrimitiveName {
  return name in getPrimitives();
}
