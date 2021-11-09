import { execSync } from "child_process";
import { join } from "path";

export function toZJSON(zson: string) {
  const zed = "npx zed";
  const cmd = `${zed} query -f zjson -`;
  const result = execSync(cmd, { encoding: "utf-8", input: zson });
  return result
    .trim()
    .split("\n")
    .map((s) => {
      try {
        return JSON.parse(s);
      } catch (e) {
        console.error(result);
        throw e;
      }
    });
}
