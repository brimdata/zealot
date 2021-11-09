import { createFetcher, FetchArgs } from "./fetcher/fetcher";
import {
  Zealot,
  ZealotPayload,
  ZealotPayloadValue,
  QueryFormat,
} from "./types";
import { createTime } from "./util/time";
import { createZealot } from "./zealot";
import { createZealotMock, ZealotMock } from "./zealot_mock";
import * as zjson from "./zjson";
import * as zed from "./zed/index";

const ZealotContext = new zed.Context();

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
};
