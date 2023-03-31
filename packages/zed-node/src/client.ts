import {
  decode,
  BaseClient,
  LoadOpts,
  getLoadContentType,
} from '@brimdata/zed-js';
import nodeFetch from 'node-fetch';

export class Client extends BaseClient {
  public fetch = nodeFetch;

  async load(
    data: string | NodeJS.ReadableStream,
    opts: Partial<LoadOpts> = {}
  ) {
    const { pool } = opts;
    if (!pool) throw new Error("Missing required option 'pool'");
    const poolId = typeof pool === 'string' ? pool : pool.id;
    const branch = opts.branch || 'main';
    const headers: Record<string, string> = {};
    if (opts.message) headers['Zed-Commit'] = JSON.stringify(opts.message);
    const res = await this.send({
      path: `/pool/${poolId}/branch/${encodeURIComponent(branch)}`,
      method: 'POST',
      body: data,
      headers,
      contentType: getLoadContentType(opts.format) ?? '',
      signal: opts.signal,
      timeout: Infinity,
    });
    return decode(await res.json()).toJS();
  }
}
