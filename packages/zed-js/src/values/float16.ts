import { isNull } from '../utils/is-null.js';
import { TypeFloat16 } from '../types/type-float16.js';
import { Primitive } from './primitive.js';

export class Float16 extends Primitive {
  type: typeof TypeFloat16 = TypeFloat16;

  toFloat() {
    if (isNull(this.value)) return null;
    return parseFloat(this.value);
  }

  toJS() {
    return this.toFloat();
  }
}
