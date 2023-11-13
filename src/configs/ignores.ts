import { GLOB_IGNORE } from "../globs";
import type { FlatConfigItem } from "../types";

export default function configsIgnores(): FlatConfigItem[] {
  return [
    {
      name: "berlysia:ignores",
      ignores: GLOB_IGNORE,
    },
  ];
}
