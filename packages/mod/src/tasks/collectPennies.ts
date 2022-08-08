import {
  CoinSubType,
  EntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { getRandomSeed } from "isaacscript-common";
import { Task } from "../enums/Task";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

const THIS_TASK = Task.SHORT_COLLECT_PENNIES;
const NUM_PENNIES_TO_COLLECT = 10;

let penniesCollected = 0;

export function collectPennies(): void {
  const topRightGridIndex = 42;
  movePlayerToGridIndex(topRightGridIndex);

  const bottomRightGridIndex = 102;
  spawnTeleporter(bottomRightGridIndex);

  const centerGridIndex = 67;
  spawnPenny(centerGridIndex);

  penniesCollected = 0;
}

function spawnPenny(gridIndex: int) {
  spawnEntity(
    EntityType.PICKUP,
    PickupVariant.COIN,
    CoinSubType.PENNY,
    gridIndex,
  );
}

// ModCallbackCustom.POST_PICKUP_COLLECT
// PickupVariant.COIN (20)
export function postPickupCollectCoin(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  penniesCollected++;
  if (penniesCollected >= NUM_PENNIES_TO_COLLECT) {
    taskComplete();
    return;
  }

  spawnNextPenny();
}

function spawnNextPenny() {
  const game = Game();
  const room = game.GetRoom();

  let gridIndex: int;
  let gridEntity: GridEntity | undefined;
  do {
    gridIndex = room.GetRandomTileIndex(getRandomSeed());
    gridEntity = room.GetGridEntity(gridIndex);
  } while (gridEntity !== undefined);

  spawnPenny(gridIndex);
}
