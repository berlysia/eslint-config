#!/bin/bash
set -e

OLD_NAME="$1"
NEW_NAME="$2"

if [ -z "$OLD_NAME" ] || [ -z "$NEW_NAME" ]; then
  echo "Usage: $0 <old_name> <new_name>"
  exit 1
fi

echo "Replacing package name: $OLD_NAME -> $NEW_NAME"

# src/plugins.ts のインポート文を置き換え
if [ -f "src/plugins.ts" ]; then
  sed -i "s|from \"$OLD_NAME\"|from \"$NEW_NAME\"|g" src/plugins.ts
  sed -i "s|\"$OLD_NAME\"|\"$NEW_NAME\"|g" src/plugins.ts
  echo "✓ Updated src/plugins.ts"
fi

echo "Package name replacement completed"
