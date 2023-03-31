import '../lib/wasm_exec';
import bridge from 'golang-wasm/src/bridge';
import { decode, ndjson } from '@brimdata/zed-js';

const url = new URL('.', import.meta.url);
const path = url.href + 'main.wasm';
const wasm = await fetch(path);
const proxy = bridge(wasm.arrayBuffer());

export async function zq(opts: {
  program?: string;
  input?: string;
  inputFormat?: string;
}) {
  const result = await proxy.zq({ ...opts, outputFormat: 'zjson' });
  return decode(ndjson.parseLines(result));
}
