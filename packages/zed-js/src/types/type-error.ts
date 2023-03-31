import * as zjson from '../zjson.js';
import { DecodeStream } from '../decode-stream.js';
import { EncodeStream } from '../encode-stream.js';
import { Error } from '../values/error.js';
import { Type } from './types.js';
export class TypeError implements Type {
  kind = 'error';

  constructor(public type: Type) {}

  static stringify(type: Type) {
    return `error<${type.toString()}>`;
  }

  create(value: zjson.Value, stream: DecodeStream) {
    if (value === null) {
      return new Error(this, null);
    } else {
      return new Error(this, this.type.create(value, stream));
    }
  }

  serialize(stream: EncodeStream): zjson.NoId<zjson.ErrorType> {
    return {
      kind: 'error',
      type: stream.encodeType(this.type),
    };
  }

  toString(): string {
    return TypeError.stringify(this.type);
  }
}
