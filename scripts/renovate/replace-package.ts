import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [oldName, newName] = process.argv.slice(2);

if (!oldName || !newName) {
  throw new Error("Usage: tsx replace-package.ts <old_name> <new_name>");
}

console.log(`Replacing package name: ${oldName} -> ${newName}`);

const pluginsPath = path.resolve(process.cwd(), "src/plugins.ts");

let content = readFileSync(pluginsPath, "utf8");

// インポート文のパッケージ名を置き換え
content = content.replaceAll(`from "${oldName}"`, `from "${newName}"`);

// assertPlugin呼び出しの引数を置き換え
content = content.replaceAll(`"${oldName}"`, `"${newName}"`);

writeFileSync(pluginsPath, content, "utf8");

console.log("✓ Updated src/plugins.ts");
console.log("Package name replacement completed");
