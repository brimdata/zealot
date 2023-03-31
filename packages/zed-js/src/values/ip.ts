import { TypeIp } from '../types/type-ip.js';
import { Primitive } from './primitive.js';

export class Ip extends Primitive {
  type: typeof TypeIp = TypeIp;

  toJS() {
    return this.toString();
  }
}
