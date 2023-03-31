import { isNull } from '../utils/is-null.js';
import { TypeFloat32 } from '../types/type-float32.js';
import { Primitive } from './primitive.js';

export class Float32 extends Primitive {
  type: typeof TypeFloat32 = TypeFloat32;

  toFloat() {
    if (isNull(this.value)) return null;
    return parseFloat(this.value);
  }

  toJS() {
    return this.toFloat();
  }
}
