import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { enableShooting, movePlayerToGridIndex } from "../util";

const THIS_TASK = Task.LONG_KILL_WORMS;
const TYPE_OF_ENEMY = EntityType.ENTITY_ROUND_WORM;

export function killWorms(): void {
  const game = Game();
  const room = game.GetRoom();

  const centerGridIndex = 67;
  movePlayerToGridIndex(centerGridIndex);
  enableShooting();

  const rightGridIndex = 73;
  spawnTeleporter(rightGridIndex);

  const wormGridIndexes = [32, 37, 42, 92, 97, 102, 62, 72];
  for (const gridIndex of wormGridIndexes) {
    const position = room.GetGridPosition(gridIndex);
    Isaac.Spawn(TYPE_OF_ENEMY, 0, 0, position, Vector.Zero, undefined);
  }
}

export function postEntityKill(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const numAliveEnemies = Isaac.CountEntities(undefined, TYPE_OF_ENEMY);
  if (numAliveEnemies === 0) {
    taskComplete();
  }
}
