import { removeAllMatchingEntities } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { movePlayerToGridIndex, spawnEntity } from "../util";

const THIS_TASK = Task.SHORT_LOAD_SLOT_MACHINES;
const NUM_SLOT_MACHINES = 4;
const SLOT_MACHINE_SPACING = 2;

export function loadSlotMachines(): void {
  const topRightGridIndex = 42;
  movePlayerToGridIndex(topRightGridIndex);

  const bottomRightGridIndex = 102;
  spawnTeleporter(bottomRightGridIndex);

  const startingGridIndex = 49;
  for (let i = 0; i < NUM_SLOT_MACHINES; i++) {
    const gridIndex = startingGridIndex + i * SLOT_MACHINE_SPACING;
    spawnEntity(EntityType.ENTITY_SLOT, SlotVariant.SLOT_MACHINE, 0, gridIndex);
  }

  const coinGridIndexes: int[] = [79, 80, 81, 82, 83, 84, 85];
  for (const gridIndex of coinGridIndexes) {
    const coins = spawnEntity(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COIN,
      CoinSubType.COIN_DOUBLEPACK,
      gridIndex,
    );
    const sprite = coins.GetSprite();
    sprite.SetLastFrame();
  }
}

// ModCallbacks.MC_POST_UPDATE (1)
export function postUpdate(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  // In case a Dollar spawns
  removeAllMatchingEntities(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
  );

  const player = Isaac.GetPlayer();
  const numCoins = player.GetNumCoins();
  const coins = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COIN,
  );

  if (numCoins === 0 && coins.length === 0) {
    taskComplete();
  }
}
