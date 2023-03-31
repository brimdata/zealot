import { TypeString } from '../types/type-string.js';
import { Primitive } from './primitive.js';

export class String extends Primitive {
  type: typeof TypeString = TypeString;

  toJS() {
    return this.toString();
  }
}
