import { ModCallbacksCustom, ModUpgraded } from "isaacscript-common";
import * as featureTeleporter from "../features/teleporter";
import * as bombRocks from "../tasks/bombRocks";
import * as destroyGiantPoop from "../tasks/destroyGiantPoop";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE,
    rock,
    GridEntityType.GRID_ROCK, // 2
  );

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE,
    poop,
    GridEntityType.GRID_POOP, // 14
  );

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE,
    teleporter,
    GridEntityType.GRID_TELEPORTER, // 23
  );
}

// GridEntityType.GRID_ROCK (2)
function rock(gridEntity: GridEntity) {
  bombRocks.postGridEntityUpdateRock(gridEntity);
}

// GridEntityType.GRID_POOP (14)
function poop(gridEntity: GridEntity) {
  destroyGiantPoop.postGridEntityUpdatePoop(gridEntity);
}

// GridEntityType.GRID_TELEPORTER (23)
function teleporter(gridEntity: GridEntity) {
  featureTeleporter.postGridEntityUpdateTeleporter(gridEntity);
}
