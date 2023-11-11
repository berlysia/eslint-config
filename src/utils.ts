import type { OptionsTypeScript } from "./types";

export function readTsConfigPath(options: OptionsTypeScript | undefined) {
  return options?.tsConfigPath ? [options.tsConfigPath].flat() : undefined;
}
