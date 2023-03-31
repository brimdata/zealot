import { EncodeStream } from '../encode-stream.js';
import { TypeIp } from '../types/type-ip.js';
import { TypeMap } from '../types/type-map.js';
import { isNull } from '../utils/is-null.js';
import { JSOptions, Value } from './types.js';

export class ZedMap implements Value {
  constructor(public type: TypeMap, public value: Map<Value, Value> | null) {}

  toString() {
    if (isNull(this.value)) return 'null';
    const contents = Array.from(this.value.entries())
      .map(([key, value]) => {
        const sep = isIPv6(key) ? ' :' : ':';
        return key.toString() + sep + value.toString();
      })
      .join(',');
    return `|{${contents}}|`;
  }

  serialize(stream: EncodeStream) {
    if (isNull(this.value)) return null;
    return Array.from(this.value.entries()).map(([k, v]) => {
      return [stream.encodeValue(k), stream.encodeValue(v)];
    });
  }

  isUnset() {
    return isNull(this.value);
  }

  toJS(opts: JSOptions = {}) {
    if (isNull(this.value)) return null;
    return new Map(
      Array.from(this.value.entries()).map(([k, v]) => [
        k.toJS(opts),
        v.toJS(opts),
      ])
    );
  }
}

function isIPv6(v: Value): boolean {
  return v.type === TypeIp && v.toString().includes(':');
}
