import { Record } from '../values/record.js';
import { Array } from '../values/array.js';
import { ZedMap } from '../values/map.js';
import { Set } from '../values/set.js';
import { Union } from '../values/union.js';
import { Error } from '../values/error.js';
import { TypeValue } from '../values/type-value.js';

const containers = [Record, Array, Set, Union, ZedMap, Error, TypeValue];

export function isContainer(value: unknown) {
  for (const name of containers) {
    if (value instanceof name) return true;
  }
  return false;
}
