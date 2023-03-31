import { TypeTypename } from '../types/type-typename.js';
import { Primitive } from './primitive.js';

// I don't think I ever use this...
export class Typename extends Primitive {
  type: typeof TypeTypename = TypeTypename;

  toJS() {
    return this.toString();
  }
}
