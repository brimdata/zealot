import * as zjson from '../zjson.js';
import { EncodeStream } from '../encode-stream.js';
import { TypeError } from '../types/type-error.js';
import { Value } from './types.js';

export class Error implements Value {
  constructor(public type: TypeError, public value: Value | null) {}

  toJS() {
    return new global.Error(this.toString());
  }

  toString(): string {
    if (this.value === null) return 'null';
    return `Error(${this.value.toString()})`;
  }

  serialize(stream: EncodeStream): zjson.Value {
    if (this.value === null) {
      return null;
    } else {
      return stream.encodeValue(this.value);
    }
  }

  isUnset(): boolean {
    return this.value === null;
  }
}
