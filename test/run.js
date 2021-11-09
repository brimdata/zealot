import * as zealot from "../dist/index.js";

const zed = zealot.createZealot("localhost:9867");

const response = await zed.query("from :pools");

console.log(await response.js());
