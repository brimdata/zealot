import { TypeAlias } from './type-alias.js';
import { TypeArray } from './type-array.js';
import { TypeMap } from './type-map.js';
import { TypeRecord } from './type-record.js';
import { TypeSet } from './type-set.js';
import { TypeUnion } from './type-union.js';
import { TypeError } from './type-error.js';

const containers = {
  record: TypeRecord,
  array: TypeArray,
  set: TypeSet,
  union: TypeUnion,
  map: TypeMap,
  alias: TypeAlias,
  error: TypeError,
} as const;

export function isContainerType(value: unknown): value is ContainerType {
  return (
    value instanceof TypeAlias ||
    value instanceof TypeArray ||
    value instanceof TypeMap ||
    value instanceof TypeRecord ||
    value instanceof TypeSet ||
    value instanceof TypeUnion ||
    value instanceof TypeError
  );
}

export default containers;

export type ContainerName = keyof typeof containers;
export type ContainerType = (typeof containers)[ContainerName];
