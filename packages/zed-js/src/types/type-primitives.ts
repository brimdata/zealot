import { TypeBool } from './type-bool.js';
import { TypeBString } from './type-bstring.js';
import { TypeBytes } from './type-bytes.js';
import { TypeDuration } from './type-duration.js';
import { TypeFloat16 } from './type-float16.js';
import { TypeFloat32 } from './type-float32.js';
import { TypeFloat64 } from './type-float64.js';
import { TypeInt16 } from './type-int16.js';
import { TypeInt32 } from './type-int32.js';
import { TypeInt64 } from './type-int64.js';
import { TypeInt8 } from './type-int8.js';
import { TypeIp } from './type-ip.js';
import { TypeNet } from './type-net.js';
import { TypeNull } from './type-null.js';
import { TypeString } from './type-string.js';
import { TypeTime } from './type-time.js';
import { TypeType } from './type-type.js';
import { TypeTypename } from './type-typename.js';
import { TypeUint16 } from './type-uint16.js';
import { TypeUint32 } from './type-uint32.js';
import { TypeUint64 } from './type-uint64.js';
import { TypeUint8 } from './type-uint8.js';

// These all point to a single instance of their type
export const getPrimitives = () => {
  return {
    string: TypeString as typeof TypeString,
    bstring: TypeBString as typeof TypeBString,
    time: TypeTime as typeof TypeTime,
    ip: TypeIp as typeof TypeIp,
    uint16: TypeUint16 as typeof TypeUint16,
    uint8: TypeUint8 as typeof TypeUint8,
    duration: TypeDuration as typeof TypeDuration,
    uint64: TypeUint64 as typeof TypeUint64,
    uint32: TypeUint32 as typeof TypeUint32,
    int64: TypeInt64 as typeof TypeInt64,
    int8: TypeInt8 as typeof TypeInt8,
    int16: TypeInt16 as typeof TypeInt16,
    null: TypeNull as typeof TypeNull,
    typename: TypeTypename as typeof TypeTypename,
    net: TypeNet as typeof TypeNet,
    float64: TypeFloat64 as typeof TypeFloat64,
    float32: TypeFloat32 as typeof TypeFloat32,
    float16: TypeFloat16 as typeof TypeFloat16,
    int32: TypeInt32 as typeof TypeInt32,
    bool: TypeBool as typeof TypeBool,
    bytes: TypeBytes as typeof TypeBytes,
    type: TypeType as typeof TypeType,
  };
};

export function isPrimitiveType(value: unknown): value is PrimitiveType {
  return (
    value === TypeString ||
    value === TypeBString ||
    value === TypeTime ||
    value === TypeIp ||
    value === TypeUint16 ||
    value === TypeUint8 ||
    value === TypeDuration ||
    value === TypeUint64 ||
    value === TypeUint32 ||
    value === TypeInt64 ||
    value === TypeInt8 ||
    value === TypeInt16 ||
    value === TypeNull ||
    value === TypeTypename ||
    value === TypeNet ||
    value === TypeFloat64 ||
    value === TypeFloat32 ||
    value === TypeFloat16 ||
    value === TypeInt32 ||
    value === TypeBool ||
    value === TypeBytes ||
    value === TypeType
  );
}

export type PrimitiveName = keyof ReturnType<typeof getPrimitives>;
export type PrimitiveType = ReturnType<typeof getPrimitives>[PrimitiveName];
