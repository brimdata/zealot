import { Enhancer, ZealotPayload, ZIterator } from "../types";
import { FetchArgs } from "./fetcher";
import { eachLine } from "../ndjson/lines";

export async function* createIterator(
  resp: Response,
  args: FetchArgs
): ZIterator {
  const enhancers = (args.enhancers || []).map((fn: Enhancer) => fn());

  for await (let json of eachLine(resp.body)) {
    yield enhancers.reduce(
      (payload: ZealotPayload, fn: (p: ZealotPayload) => any) => fn(payload),
      json
    );
  }
}
