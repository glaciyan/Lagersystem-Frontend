import { readFileSync, writeFileSync } from "fs";
const pkgjson = JSON.parse(readFileSync("./package.json"));

const versionFile = `export default "${pkgjson.version}";`;

writeFileSync("./src/version.ts", versionFile);

console.log("✓ Generated Version file.\n")
