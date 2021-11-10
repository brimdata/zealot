import { Client } from "./client";
import { createFetcher, FetchArgs } from "./fetcher/fetcher";
import {
  QueryFormat,
  Zealot,
  ZealotPayload,
  ZealotPayloadValue,
} from "./types";
import { createTime } from "./util/time";
import { createZealot } from "./zealot";
import { createZealotMock, ZealotMock } from "./zealot_mock";
import * as zed from "./zed/index";
import { RootRecord } from "./zjson";

const ZealotContext = new zed.Context();

const zjson = (obj: RootRecord[]) => {
  return ZealotContext.decode(obj);
};

export {
  ZealotContext,
  zjson,
  zed,
  createZealot,
  createZealotMock,
  createTime,
  Zealot,
  ZealotPayload,
  ZealotPayloadValue,
  QueryFormat,
  ZealotMock,
  createFetcher,
  FetchArgs,
  Client,
};
