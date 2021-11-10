import EventEmitter from "events";
import { ZealotContext } from ".";
import { Record } from "./zed";
import { ZedTypeInterface } from "./zed/types/types";

class Channel extends EventEmitter {
  rows: Record[] = [];
  types: { [name: string]: ZedTypeInterface } = {};
  shapes: { [name: string]: ZedTypeInterface } = {};
  done: boolean = false;

  consumed() {
    if (this.done) return Promise.resolve();
    return new Promise((r) => {
      this.on("end", r);
    });
  }
}

export class QueryResultStream {
  private currentChannelId: number | undefined;
  private channels = new Map<number, Channel>();

  handle(json: any) {
    switch (json.kind) {
      case "QueryChannelSet":
        this.currentChannelId = json.value.channel_id;
        break;
      case "Object":
        const channel = this.channel();
        const data = json.value;
        const name = data.schema;
        const row = ZealotContext.decodeRecord(data, channel.types);
        const type = channel.types[name];
        if (!(name in channel.shapes)) {
          channel.shapes[name] = type;
          channel.emit("shape", type);
        }
        channel.rows.push(row);
        channel.emit("row", row, channel.rows);
        break;
      case "QueryChannelEnd":
        const chan = this.channel();
        chan.done = true;
        chan.emit("end");
    }
  }

  async js() {
    const channel = this.channel(0);
    await channel.consumed();
    return channel.rows.map((r) => r.toJS());
  }

  channel(id: number | undefined = this.currentChannelId) {
    if (id === undefined) throw new Error("Current channel not set");
    let channel = this.channels.get(id);
    if (!channel) {
      channel = new Channel();
      this.channels.set(id, channel);
    }
    return channel;
  }

  on(name: any, fn: any) {
    // TODO Add types for the events
    this.channel(0).on(name, fn);
  }
}
