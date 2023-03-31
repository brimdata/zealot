import { TypeBytes } from '../types/type-bytes.js';
import { Primitive } from './primitive.js';

export class Bytes extends Primitive {
  type: typeof TypeBytes = TypeBytes;

  toJS() {
    return this.toString();
  }
}
