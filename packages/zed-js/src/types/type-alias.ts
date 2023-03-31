import * as zjson from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { EncodeStream } from '../encode-stream.js';
import { Field } from '../values/field.js';
import { Value } from '../values/types.js';
import { TypeRecord } from './type-record.js';
import { Type } from './types.js';

export class TypeAlias implements Type {
  kind = 'alias';

  constructor(public name: string, public type: Type) {}

  static stringify(name: string, type: Type) {
    return name + '=(' + type.toString() + ')';
  }

  create(value: zjson.Value, stream: DecodeStream, parent?: Field) {
    let v: Value;
    if (this.type instanceof TypeRecord || this.type instanceof TypeAlias) {
      v = this.type.create(value as zjson.RecordValue, stream, parent);
    } else {
      v = this.type.create(value, stream);
    }
    v.type = this; // a better way to do this?
    return v;
  }

  serialize(stream: EncodeStream): zjson.NoId<zjson.NamedType> {
    return {
      kind: 'named',
      name: this.name,
      type: stream.encodeType(this.type),
    };
  }

  toString() {
    return this.name + '=(' + this.type.toString() + ')';
  }
}
