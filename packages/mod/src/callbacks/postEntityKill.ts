import { ModCallback } from "isaac-typescript-definitions";
import { mod } from "../mod";
import * as killWorms from "../tasks/killWorms";

export function init(): void {
  mod.AddCallback(ModCallback.POST_ENTITY_KILL, main);
}

function main(_entity: Entity) {
  killWorms.postEntityKill();
}
