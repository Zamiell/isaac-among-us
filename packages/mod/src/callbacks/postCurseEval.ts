import { LevelCurse, ModCallback } from "isaac-typescript-definitions";
import { bitFlags } from "isaacscript-common";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_CURSE_EVAL, main);
}

function main(): BitFlags<LevelCurse> | undefined {
  return bitFlags(LevelCurse.NONE);
}
