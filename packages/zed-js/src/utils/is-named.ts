import { Type } from '../types/types.js';
import { isTypeAlias } from './is-type-alias.js';

export function isNamed(type: Type, name: string) {
  return isTypeAlias(type) && type.name === name;
}
