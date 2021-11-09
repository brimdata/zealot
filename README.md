# Zealot Client

The Zealot Client is responsible for communicating with the zqd process via the rest api. It can ingest data, search data, get the list of spaces, and more.

### Usage

```js
import {createZealot} from "./zealot"

const zealot = createZealot("localhost:9867")

// Once you have an instance you can do things like:
zealot.spaces.create({name: "my_space"})
zealot.spaces.list()

const resp = await zealot.query("192.4.53.101 | count()", {
  spaceId: "1",
  from: new Date(0),
  to: new Date()
})
const records = await resp.records()
```

An API call made with zealot can either return a Promise that resolves with the actual data from the HTTP request, or a Promise that resolves with a "Stream" object. Here is an example of each.

**Promise\<Data\>**

```js
const space = await zealot.spaces.get("sp_123abc")
// => {name: "space123", id: "sp_123abc", data_dir: "...}
```

**Promise\<Stream\>**

```js
const stream = await zealot.search("_path=dns")
// => interable stream with several ways to consume

// 1. For await loop
for await (const payload of stream) {
  // payload => {type: "TaskStart" task_id: 1}
}

// 2. Collect all payloads in an array
const payloads = await stream.array()
// => [{type: "TaskStart", task_id:1}, {type: "SearchRecords"...]

// 3. Collect and concat the zjson records
const records = await stream.records()
// => [{id: 1, type: [{name: "_path, type: "string"}, ...], values: ["dns"...]} ...]

// 4. Setup callbacks that are called when payloads arrive
stream.callbacks()
  .start(payload => {...})
  .end(payload => {...})
  .records(payload => {...})
  .stats(payload => {...})
  .warning(payload => {...})
  .error(e => {...})
```
