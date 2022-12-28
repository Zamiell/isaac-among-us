import { LevelCurse, ModCallback } from "isaac-typescript-definitions";
import { bitFlags } from "isaacscript-common";
import { mod } from "../mod";

export function init(): void {
  mod.AddCallback(ModCallback.POST_CURSE_EVAL, main);
}

function main(): BitFlags<LevelCurse> | undefined {
  return bitFlags(LevelCurse.NONE);
}
