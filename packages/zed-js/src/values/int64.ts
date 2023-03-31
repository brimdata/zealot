import { isNull } from '../utils/is-null.js';
import { TypeInt64 } from '../types/type-int64.js';
import { Primitive } from './primitive.js';
import { JSOptions } from './types.js';

export class Int64 extends Primitive {
  type: typeof TypeInt64 = TypeInt64;

  toInt() {
    if (isNull(this.value)) return null;
    return parseInt(this.value);
  }

  toBigInt() {
    if (isNull(this.value)) return null;
    return BigInt(this.value);
  }

  toJS(opts: JSOptions = {}) {
    if (opts.bigint) {
      return this.toBigInt();
    } else {
      return this.toInt();
    }
  }
}
