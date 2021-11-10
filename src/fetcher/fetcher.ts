import { url } from "../util/utils";
import { parseContentType } from "./contentType";
import { Enhancer, ZealotUploadPayload, ZResponse } from "../types";
import { createIterator } from "./iterator";
import { createError } from "../util/error";
import { createPushableIterator } from "./pushable-iterator";
import { parseLines } from "../ndjson/lines";
import fetch, { Headers } from "node-fetch";

export type FetchArgs = {
  path: string;
  method: string;
  body?: string | FormData | ReadableStream;
  headers?: Headers;
  enhancers?: Enhancer[];
  signal?: AbortSignal;
};

export function createFetcher(host: string) {
  return {
    async promise(args: FetchArgs) {
      const { path, method, body, signal, headers } = args;
      const resp = await fetch(url(host, path), {
        method,

        // @ts-ignore
        body,
        signal,
        headers,
      });
      const content = await parseContentType(resp);
      return resp.ok ? content : Promise.reject(createError(content));
    },
    async stream(args: FetchArgs): Promise<ZResponse> {
      const { path, method, body, signal, headers } = args;
      const resp = await fetch(url(host, path), {
        method,
        // @ts-ignore
        body,
        signal,
        headers,
      });
      if (!resp.ok) {
        const content = await parseContentType(resp);
        return Promise.reject(createError(content));
      }
      // @ts-ignore
      const iterator = createIterator(resp, args);
      // @ts-ignore
      return createStream(iterator, resp);
    },
    async upload(args: FetchArgs): Promise<ZResponse> {
      return new Promise((resolve) => {
        const iterator = createPushableIterator<ZealotUploadPayload>();
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (!e.lengthComputable) return;
          iterator.push({
            value: { type: "UploadProgress", progress: e.loaded / e.total },
            done: false,
          });
        });

        xhr.addEventListener("load", async () => {
          for (const value of parseLines(xhr.responseText))
            iterator.push({ value, done: false });
        });

        xhr.addEventListener("error", () => {
          iterator.throw(new Error(xhr.responseText));
        });

        xhr.addEventListener("loadend", () => {
          iterator.push({ done: true, value: undefined });
        });

        xhr.open(args.method, url(host, args.path), true);
        if (args.headers) {
          for (const [header, val] of args.headers.entries())
            xhr.setRequestHeader(header, val);
        }

        // @ts-ignore
        xhr.send(args.body);
        // @ts-ignore
        resolve(createStream(iterator, xhr));
      });
    },
  };
}
