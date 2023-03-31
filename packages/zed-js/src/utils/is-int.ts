import { Int16 } from '../values/int16.js';
import { Int32 } from '../values/int32.js';
import { Int64 } from '../values/int64.js';
import { Int8 } from '../values/int8.js';
import { ZedInt } from '../values/types.js';
import { Uint16 } from '../values/uint16.js';
import { Uint32 } from '../values/uint32.js';
import { Uint64 } from '../values/uint64.js';
import { Uint8 } from '../values/uint8.js';

export function isInt(value: unknown): value is ZedInt {
  return (
    value instanceof Int64 ||
    value instanceof Int32 ||
    value instanceof Int16 ||
    value instanceof Int8 ||
    value instanceof Uint64 ||
    value instanceof Uint32 ||
    value instanceof Uint16 ||
    value instanceof Uint8
  );
}
