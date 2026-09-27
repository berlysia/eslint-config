import path from "node:path";
import fs from "node:fs";
import url from "node:url";
import * as morph from "ts-morph";

export function clean(removeTargetRules: Set<string>): void {
  /*
src/rules配下のTypeScriptファイルに対して次の操作をする
（ルールのリテラル定義はsrc/configsからsrc/rulesへ移設済み）

1. ファイルの中身を文字列として読む
1. ts-morphを使ってASTに変換する
1. オブジェクトリテラルを定義している個所をすべて抽出する
1. そのうち、rulesを定義している個所を抽出する
1. rulesの定義の中からremoveTargetRulesに含まれるものを削除する
1. 操作した結果のファイルを書きだす
*/

  const rulesDir = path.resolve(import.meta.dirname, "../src/rules");
  const ruleFiles = fs.readdirSync(rulesDir);

  for (const ruleFile of ruleFiles) {
    const configFilePath = path.resolve(rulesDir, ruleFile);
    const configSource = fs.readFileSync(configFilePath, "utf8");

    const project = new morph.Project();
    const sourceFile = project.createSourceFile(configFilePath, configSource, {
      overwrite: true,
    });

    const objectLiteralExpressions = sourceFile.getDescendantsOfKind(
      morph.SyntaxKind.ObjectLiteralExpression,
    );
    const rulesObjectLiteralExpressions = objectLiteralExpressions.filter(
      (objectLiteralExpression) => {
        const parent = objectLiteralExpression.getParent();

        // `export const typeAwareRules = { rules: { ... } }` 形式（typescript.ts）
        if (
          parent.isKind(morph.SyntaxKind.PropertyAssignment) &&
          parent.getName() === "rules"
        ) {
          return true;
        }

        // `export function rulesXxx(...) { return { ... }; }` 形式（他の src/rules/*.ts）
        if (parent.isKind(morph.SyntaxKind.ReturnStatement)) {
          return true;
        }

        return false;
      },
    );

    for (const rulesObjectLiteralExpression of rulesObjectLiteralExpressions) {
      const rules = rulesObjectLiteralExpression.getChildrenOfKind(
        morph.SyntaxKind.PropertyAssignment,
      );
      for (const rule of rules) {
        const nameNode = rule.getNameNode();

        // { identifier: value } と { "stringLiteral": value } の2パターンがある
        const isTargetForIdentifier =
          nameNode.isKind(morph.SyntaxKind.Identifier) &&
          removeTargetRules.has(nameNode.getText());

        const isTargetForStringLiteral =
          nameNode.isKind(morph.SyntaxKind.StringLiteral) &&
          removeTargetRules.has(nameNode.getLiteralValue());

        if (isTargetForIdentifier || isTargetForStringLiteral) {
          rule.remove();
        }
      }
    }

    const result = sourceFile.getFullText();
    fs.writeFileSync(configFilePath, result);
  }
}
