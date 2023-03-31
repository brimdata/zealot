import { Time } from '../values/time.js';

export function isTime(value: unknown): value is Time {
  return value instanceof Time;
}
