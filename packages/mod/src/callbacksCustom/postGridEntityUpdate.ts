import { GridEntityType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "isaacscript-common";
import * as featureTeleporter from "../features/teleporter";
import { mod } from "../mod";
import * as bombRocks from "../tasks/bombRocks";
import * as destroyGiantPoop from "../tasks/destroyGiantPoop";

export function init(): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_UPDATE,
    rock,
    GridEntityType.ROCK, // 2
  );

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_UPDATE,
    poop,
    GridEntityType.POOP, // 14
  );

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_UPDATE,
    teleporter,
    GridEntityType.TELEPORTER, // 23
  );
}

// GridEntityType.ROCK (2)
function rock(gridEntity: GridEntity) {
  bombRocks.postGridEntityUpdateRock(gridEntity);
}

// GridEntityType.POOP (14)
function poop(gridEntity: GridEntity) {
  destroyGiantPoop.postGridEntityUpdatePoop(gridEntity);
}

// GridEntityType.TELEPORTER (23)
function teleporter(gridEntity: GridEntity) {
  featureTeleporter.postGridEntityUpdateTeleporter(gridEntity);
}
