import { ZealotContext, zed } from "../index";
import * as lake from "../lake";
import { TypeAlias, TypeRecord } from "../zed/index";
import { TypeDefs } from "../zed/context";
import { ZedTypeInterface } from "../zed/types/types";

type SchemaMap = { [name: string]: zed.Schema };

export interface RecordCallbackRet {
  channel: number;
  schemas: SchemaMap;
  newRow: zed.Record;
  rows: zed.Record[];
}

type ChannelMap = Map<number, Channel>;
type Channel = { rows: zed.Record[]; schemas: SchemaMap; typedefs: TypeDefs };
type RecordCallback = (
  payload: lake.QueryRecordValue,
  channel: number
) => RecordCallbackRet;

function getChannel(id: number, channels: ChannelMap): Channel {
  if (!channels.has(id)) {
    channels.set(id, {
      rows: [],
      schemas: {},
      typedefs: {},
    });
  }
  return channels.get(id) as Channel;
}

export function createRecordCallback(): RecordCallback {
  let channels = new Map<number, Channel>();

  return (record: lake.QueryRecordValue, channel: number) => {
    const { typedefs, schemas, rows: prevRows } = getChannel(channel, channels);
    const newRow = ZealotContext.decodeRecord(record, typedefs);
    const name = record.schema;
    const type = typedefs[name] as TypeRecord | TypeAlias;
    schemas[name] = new zed.Schema(name, type);

    const rows = prevRows.concat(newRow);
    channels.set(channel, { rows, typedefs, schemas });

    return { channel, rows, newRow, schemas };
  };
}
