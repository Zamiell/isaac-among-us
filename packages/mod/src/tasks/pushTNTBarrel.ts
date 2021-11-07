import { getGridEntities, spawnGridEntity } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { enableShooting, movePlayerToGridIndex } from "../util";

const THIS_TASK = Task.SHORT_PUSH_TNT_BARREL;

export function pushTNTBarrel(): void {
  const game = Game();
  const room = game.GetRoom();

  const bottomLeftGridIndex = 92;
  movePlayerToGridIndex(bottomLeftGridIndex);
  enableShooting();

  const topLeftGridIndex = 32;
  spawnTeleporter(topLeftGridIndex);

  const leftGridIndex = 63;
  const position = room.GetGridPosition(leftGridIndex);
  Isaac.Spawn(
    EntityType.ENTITY_MOVABLE_TNT,
    0,
    0,
    position,
    Vector.Zero,
    undefined,
  );

  const rockGridIndexes = [55, 56, 57, 85, 86, 87, 72];
  for (const gridIndex of rockGridIndexes) {
    spawnGridEntity(GridEntityType.GRID_ROCK, gridIndex);
  }
}

export function postUpdate(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  if (allRocksBroken()) {
    taskComplete();
  }
}

function allRocksBroken() {
  const rocks = getGridEntities(GridEntityType.GRID_ROCK);
  for (const rock of rocks) {
    if (rock.State === RockState.UNBROKEN) {
      return false;
    }
  }

  return true;
}
