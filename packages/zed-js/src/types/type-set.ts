import * as zjson from '../zjson.js';
import { SetValue } from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { EncodeStream } from '../encode-stream.js';
import { isNull } from '../utils/is-null.js';
import { Set } from '../values/set.js';
import { Type } from './types.js';

export class TypeSet implements Type {
  kind = 'set';

  constructor(public type: Type) {}

  static stringify(type: Type) {
    return `|[${type.toString()}]|`;
  }

  create(values: SetValue, stream: DecodeStream) {
    return new Set(
      this,
      isNull(values) ? null : values.map((v) => this.type.create(v, stream))
    );
  }

  serialize(stream: EncodeStream): zjson.NoId<zjson.SetType> {
    return {
      kind: 'set',
      type: stream.encodeType(this.type),
    };
  }

  toString() {
    return `|[` + this.type.toString() + `]|`;
  }
}
