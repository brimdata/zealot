import { String } from '../values/string.js';

export function isStringy(value: unknown): value is String {
  return value instanceof String;
}
