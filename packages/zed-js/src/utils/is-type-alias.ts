import { TypeAlias } from '../types/type-alias.js';

export function isTypeAlias(type: unknown): type is TypeAlias {
  return type instanceof TypeAlias;
}
