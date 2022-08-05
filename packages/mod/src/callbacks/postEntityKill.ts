import { ModCallback } from "isaac-typescript-definitions";
import * as killWorms from "../tasks/killWorms";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_ENTITY_KILL, main);
}

function main(_entity: Entity) {
  killWorms.postEntityKill();
}
