import { EventEmitter } from 'events';
import { DefaultContext } from '../context.js';
import { DecodeStream } from '../decode-stream.js';
import { Collector, TypeDefs } from '../types.js';
import { Type } from '../types/types.js';
import { Value } from '../values/types.js';
import * as zjson from '../zjson.js';
export class Channel extends EventEmitter {
  rows: Value[] = [];
  shapesMap: TypeDefs = {};
  stream = new DecodeStream(DefaultContext);

  get shapes() {
    return Object.values(this.shapesMap);
  }

  addRow(row: Value) {
    this.rows.push(row);
    this.emit('row', row);
  }

  addShape(id: number | string, type: Type) {
    this.shapesMap[id] = type;
    this.emit('shape', type);
  }

  hasShape(id: number) {
    return id in this.shapesMap;
  }

  done() {
    this.emit('end');
  }

  consume(json: zjson.Obj) {
    const value = this.stream.decode(json);
    if ('id' in json.type && !this.hasShape(json.type.id)) {
      this.addShape(json.type.id, value.type);
    } else if (json.type.kind === 'primitive') {
      this.addShape(json.type.name, value.type);
    }
    this.addRow(value);
  }

  collect(collector: Collector) {
    /**
     * The goal here is to get the first batch of results out
     * to the collector as soon as possible. Then, only give
     * updates every timeThres. This allows the UI to avoid
     * frequent, expensive updates.
     */
    let first = true;
    let count = 0;
    const countThresh = 2000;
    const timeThresh = 2000;
    let timeId: ReturnType<typeof setTimeout>;

    const flush = () => {
      collector({ rows: this.rows, shapesMap: this.shapesMap });
      first = false;
      count = 0;
      clearTimeout(timeId);
    };

    const startTimer = () => {
      timeId = setTimeout(() => {
        if (count > 0) flush();
        startTimer();
      }, timeThresh);
    };

    this.on('row', () => {
      count += 1;
      if (first && count >= countThresh) flush();
    });

    this.on('end', () => flush());

    startTimer();
  }
}
