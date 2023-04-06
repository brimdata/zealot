# zed-wasm

The zed command line tools built for Web Assembly.

[View the Demo](https://observablehq.com/d/f2b3836df355792b)

[Zed](https://github.com/brimdata/zed) is a suite of technologies for managing, storing, and processing data. It's a
<b>superset</b> of schema-defined <b>tables</b>, and
<b>unstructured documents</b>; an emerging concept we call
<a href="https://zed.brimdata.io/docs/formats#2-zed-a-super-structured-pattern">
super-structured data
</a>
.

The <a href="https://zed.brimdata.io/docs/formats">storage layer</a>
, <a href="https://zed.brimdata.io/docs/formats/zed">type system</a>
,
<a href="https://zed.brimdata.io/docs/language/overview">
query language
</a>
, and <a href="https://zed.brimdata.io/docs/commands/zq">zq</a>
command-line utility are just a few of the tools Zed offers to the
data community.

This packages brings Zed into your browser.

## Example

```html
<script type="module">
  import { zq } from 'https://cdn.jsdelivr.net/npm/@brimdata/zed-wasm@0.0.3/index.js';

  const result = await zq({
    input: '1 2 3',
    program: 'this + 1',
  });

  console.log(result);
  /* (3) [Int64, Int64, Int64]
        0 : Int64 {value: '2', type: TypeOfInt64}
        1 : Int64 {value: '3', type: TypeOfInt64}
        2 : Int64 {value: '4', type: TypeOfInt64} */
</script>
```

## Installation

The easiest way to work with the published version of zed-wasm is to use a CDN like JsDelivr. Use the url below inside of a `script` tag with the type property set to "module".

```js
import { zq } from 'https://cdn.jsdelivr.net/npm/@brimdata/zed-wasm@0.0.3/index.js';
```

## API

Only the zq function is exposed at the moment. It takes an options object and returns an array of Zed Value Objects.

```js
function zq(options: {
  input?: string;
  program?: string;
  inputFormat?: InputFormat;
}): Promise<zed.Any[]>;

type InputFormat =
  | 'auto'
  | 'arrows'
  | 'csv'
  | 'json'
  | 'line'
  | 'parquet'
  | 'vng'
  | 'zeek'
  | 'zjson'
  | 'zng'
  | 'zson';
```
