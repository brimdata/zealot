import { TypeNull } from '../types/type-null.js';
import { Primitive } from './primitive.js';

export class Null extends Primitive {
  type: typeof TypeNull = TypeNull;
  override value = null;

  toJS() {
    return null;
  }
}
