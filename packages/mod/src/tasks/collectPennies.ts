import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { movePlayerToGridIndex, spawnEntity } from "../util";

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
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COIN,
    CoinSubType.COIN_PENNY,
    gridIndex,
  );
}

// ModCallbacksCustom.MC_POST_PICKUP_COLLECT
// PickupVariant.PICKUP_COIN (20)
export function postPickupCollectCoin(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  penniesCollected += 1;
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
    gridIndex = room.GetRandomTileIndex(Random());
    gridEntity = room.GetGridEntity(gridIndex);
  } while (gridEntity !== undefined);

  spawnPenny(gridIndex);
}
