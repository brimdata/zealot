import { BString } from "../values/bstring";
import { BasePrimitive } from "./base-primitive";

class TypeOfBString extends BasePrimitive<BString> {
  name = "bstring";

  create(value: string) {
    return new BString(value);
  }
}

export const TypeBString = new TypeOfBString();
