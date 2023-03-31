import { isNull } from '../utils/is-null.js';
import { TypeInt8 } from '../types/type-int8.js';
import { Primitive } from './primitive.js';

export class Int8 extends Primitive {
  type: typeof TypeInt8 = TypeInt8;

  toInt() {
    if (isNull(this.value)) return null;
    return parseInt(this.value);
  }

  toJS() {
    return this.toInt();
  }
}
