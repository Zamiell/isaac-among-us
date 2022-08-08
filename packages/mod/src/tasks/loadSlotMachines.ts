import { Task } from "common";
import {
  CoinSubType,
  EntityType,
  PickupVariant,
  SlotVariant,
} from "isaac-typescript-definitions";
import { getSlots, removeAllMatchingEntities } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

const THIS_TASK = Task.LONG_LOAD_SLOT_MACHINES;
const NUM_SLOT_MACHINES = 4;
const SLOT_MACHINE_SPACING = 2;

const SLOT_ACTIVE_ANIMATIONS = new Set<string>([
  "Initiate",
  "Wiggle",
  "WiggleEnd",
]);

export function loadSlotMachines(): void {
  const topRightGridIndex = 42;
  movePlayerToGridIndex(topRightGridIndex);

  const bottomRightGridIndex = 102;
  spawnTeleporter(bottomRightGridIndex);

  const startingGridIndex = 49;
  for (let i = 0; i < NUM_SLOT_MACHINES; i++) {
    const gridIndex = startingGridIndex + i * SLOT_MACHINE_SPACING;
    spawnEntity(EntityType.SLOT, SlotVariant.SLOT_MACHINE, 0, gridIndex);
  }

  const coinGridIndexes: int[] = [79, 80, 81, 82, 83, 84, 85];
  for (const gridIndex of coinGridIndexes) {
    spawnDoubleCoin(gridIndex);
  }
}

function spawnDoubleCoin(gridIndex: int) {
  const entity = spawnEntity(
    EntityType.PICKUP,
    PickupVariant.COIN,
    CoinSubType.DOUBLE_PACK,
    gridIndex,
  );
  const sprite = entity.GetSprite();
  sprite.SetLastFrame();
}

// ModCallback.POST_UPDATE (1)
export function postUpdate(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  // In case a Dollar spawns.
  removeAllMatchingEntities(EntityType.PICKUP, PickupVariant.COLLECTIBLE);

  const player = Isaac.GetPlayer();
  const numCoinsInInventory = player.GetNumCoins();
  const numCoinsInRoom = Isaac.CountEntities(
    undefined,
    EntityType.PICKUP,
    PickupVariant.COIN,
  );

  if (numCoinsInInventory === 0 && numCoinsInRoom === 0 && !isAnySlotActive()) {
    taskComplete();
  }
}

function isAnySlotActive() {
  for (const slot of getSlots()) {
    const sprite = slot.GetSprite();
    const animation = sprite.GetAnimation();

    if (SLOT_ACTIVE_ANIMATIONS.has(animation)) {
      return true;
    }
  }

  return false;
}

// ModCallback.POST_PICKUP_INIT (34)
// PickupVariant.PILL (70)
export function postPickupInitPill(pickup: EntityPickup): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  pickup.Remove();
}
