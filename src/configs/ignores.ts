import { GLOB_IGNORE } from "../globs";
import type { FlatConfigItem } from "../types";

export default function configsIgnores(): FlatConfigItem[] {
  return [
    {
      /**
       * DO NOT ADD ANY OTHER KEY HERE
       * @see https://github.com/humanwhocodes/config-array/blob/26afaaa125f42abc4f9e6d88a9873a61ea66909d/src/config-array.js#L520-L526
       */
      ignores: GLOB_IGNORE,
    },
  ];
}
