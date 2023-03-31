import { TypeBString } from '../types/type-bstring.js';
import { Primitive } from './primitive.js';

export class BString extends Primitive {
  type: typeof TypeBString = TypeBString;

  toJS() {
    return this.toString();
  }
}
