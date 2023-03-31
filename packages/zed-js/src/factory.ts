import { Record } from './values/record.js';
import { Field } from './values/field.js';
import { TypeField } from './types/type-field.js';
import { DefaultContext } from './context.js';
import { TypeRecord } from './types/type-record.js';
import { decode, encode } from './encoder.js';
import { isValue } from './utils/is-value.js';
import { Value } from './values/types.js';
import { Null } from './values/null.js';
import { String } from './values/string.js';
import { Time } from './values/time.js';
import { Uint64 } from './values/uint64.js';
import { Float64 } from './values/float64.js';
import { Ip } from './values/ip.js';

// Convert a js object into a zed record

export function createRecord(object: { [key: string]: unknown }): Record {
  const fields: Field[] = [];
  for (const name in object) {
    fields.push(createField(name, object[name]));
  }
  const typeFields = fields.map((f) => new TypeField(f.name, f.value.type));

  // This could be more efficient
  const type: TypeRecord = DefaultContext.lookupTypeRecord(typeFields);
  const r = new Record(type, fields);
  // This is necessary at the moment to add field parents,
  // and to match the codepath that runs in production.
  return decode(encode(r)) as Record;
}

export function createField(name: string, value: unknown): Field {
  return new Field(name, createData(value), null);
}

export function createData(value: unknown): Value {
  if (isValue(value)) {
    return value as Value;
  }

  if (value === null) {
    return new Null();
  }

  if (value instanceof Date) {
    return new Time(value.toISOString());
  }

  if (Number.isInteger(value)) {
    return new Uint64((value as number).toString());
  }

  if (typeof value === 'number') {
    return new Float64(value.toString());
  }

  if (typeof value === 'string' && isIp(value)) {
    return new Ip(value);
  }

  if (typeof value === 'string') {
    return new String(value);
  }

  if (typeof value === 'object' && value?.constructor === Object) {
    return createRecord(value as { [k: string]: unknown });
  }

  throw new Error(`Implement this: ${JSON.stringify(value)}`);
}

function isIp(string: string) {
  const blocks: string[] = string.split('.');
  if (blocks.length !== 4) return false;
  return blocks.every((block) => {
    return Number(block) >= 0 && Number(block) <= 255;
  });
}
