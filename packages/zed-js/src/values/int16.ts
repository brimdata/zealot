import { isNull } from '../utils/is-null.js';
import { TypeInt16 } from '../types/type-int16.js';
import { Primitive } from './primitive.js';

export class Int16 extends Primitive {
  type: typeof TypeInt16 = TypeInt16;

  toInt() {
    if (isNull(this.value)) return null;
    return parseInt(this.value);
  }

  toJS() {
    return this.toInt();
  }
}
