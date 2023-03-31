import * as zjson from '../zjson.js';
import { EncodeStream } from '../encode-stream.js';
import { Type } from '../types/types.js';
import { Array } from './array.js';
import { Bool } from './bool.js';
import { BString } from './bstring.js';
import { Bytes } from './bytes.js';
import { Duration } from './duration.js';
import { Error } from './error.js';
import { Float64 } from './float64.js';
import { Int16 } from './int16.js';
import { Int32 } from './int32.js';
import { Int64 } from './int64.js';
import { Int8 } from './int8.js';
import { Ip } from './ip.js';
import { ZedMap } from './map.js';
import { Net } from './net.js';
import { Null } from './null.js';
import { Record } from './record.js';
import { Set } from './set.js';
import { String } from './string.js';
import { Time } from './time.js';
import { TypeValue } from './type-value.js';
import { Uint16 } from './uint16.js';
import { Uint32 } from './uint32.js';
import { Uint64 } from './uint64.js';
import { Uint8 } from './uint8.js';
import { Union } from './union.js';

export type ZedValue =
  | Array
  | Bool
  | BString
  | Bytes
  | Duration
  | Error
  | Float64
  | Int8
  | Int16
  | Int32
  | Int64
  | Ip
  | ZedMap
  | Net
  | Record
  | Set
  | String
  | Time
  | TypeValue
  | Uint8
  | Uint16
  | Uint32
  | Uint64
  | Union
  | Null;

export type ZedInt =
  | Uint8
  | Uint16
  | Uint32
  | Uint64
  | Int8
  | Int16
  | Int32
  | Int64;

export type JSOptions = {
  bigint?: boolean;
};

export interface Value {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJS(opts?: JSOptions): any;
  toString(): string;
  serialize(stream: EncodeStream): zjson.Value;
  isUnset(): boolean;
  type: Type;
}
