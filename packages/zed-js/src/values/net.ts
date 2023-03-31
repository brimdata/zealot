import { TypeNet } from '../types/type-net.js';
import { Primitive } from './primitive.js';

export class Net extends Primitive {
  type: typeof TypeNet = TypeNet;

  toJS() {
    return this.toString();
  }
}
