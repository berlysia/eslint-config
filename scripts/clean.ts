import path from "node:path";
import fs from "node:fs";
import url from "node:url";
// eslint-disable-next-line import/no-namespace -- in devDependencies
import * as morph from "ts-morph";

export function clean(removeTargetRules: Set<string>): void {
  /*
src/configs配下のTypeScriptファイルに対して次の操作をする

1. ファイルの中身を文字列として読む
1. ts-morphを使ってASTに変換する
1. オブジェクトリテラルを定義している個所をすべて抽出する
1. そのうち、rulesを定義している個所を抽出する
1. rulesの定義の中からremoveTargetRulesに含まれるものを削除する
1. 操作した結果のファイルを書きだす
*/

  const configsDir = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "../src/configs",
  );
  const configFiles = fs.readdirSync(configsDir);

  for (const configFile of configFiles) {
    const configFilePath = path.resolve(configsDir, configFile);
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

        return (
          parent.isKind(morph.SyntaxKind.PropertyAssignment) &&
          parent.getName() === "rules"
        );
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
