import { Record } from "./record";
import { ZedValue, ZedValueInterface } from "./types";

export class Field {
  constructor(
    public name: string,
    public value: ZedValueInterface,
    public parent: Record | Field | null
  ) {}

  /**
   * Alias for value
   */
  get data() {
    return this.value;
  }

  get path() {
    let path: string[] = [this.name];
    let parent = this.parent;
    while (parent && parent instanceof Field) {
      path.unshift(parent.name);
      parent = parent.parent;
    }
    return path;
  }

  get rootRecord() {
    let parent = this.parent;
    while (parent && parent instanceof Field) {
      parent = parent.parent;
    }
    if (parent instanceof Record) return parent;
    else return null;
  }
}
