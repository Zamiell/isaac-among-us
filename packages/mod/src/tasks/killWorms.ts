import { Task } from "common";
import { EntityType } from "isaac-typescript-definitions";
import { countEntities, game, VectorZero } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { enableShooting, movePlayerToGridIndex } from "../utils";

const THIS_TASK = Task.LONG_KILL_WORMS;
const TYPE_OF_ENEMY = EntityType.ROUND_WORM;

export function killWorms(): void {
  const room = game.GetRoom();

  const centerGridIndex = 67;
  movePlayerToGridIndex(centerGridIndex);
  enableShooting();

  const rightGridIndex = 73;
  spawnTeleporter(rightGridIndex);

  const wormGridIndexes = [32, 37, 42, 92, 97, 102, 62, 72];
  for (const gridIndex of wormGridIndexes) {
    const position = room.GetGridPosition(gridIndex);
    Isaac.Spawn(TYPE_OF_ENEMY, 0, 0, position, VectorZero, undefined);
  }
}

export function postEntityKill(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  // We subtract one because the entity that is dying is not removed from the room yet.
  const numAliveEnemies = countEntities(TYPE_OF_ENEMY) - 1;
  if (numAliveEnemies === 0) {
    taskComplete();
  }
}
