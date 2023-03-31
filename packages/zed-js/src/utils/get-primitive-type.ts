import { getPrimitives, PrimitiveName } from '../types/type-primitives.js';

export function getPrimitiveType(name: PrimitiveName) {
  const obj = getPrimitives();
  if (name in obj) return obj[name];
  else throw new Error('Unknown primitive:' + name);
}
