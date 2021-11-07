import { getAliveNPCs } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { enableShooting, movePlayerToGridIndex } from "../util";

const THIS_TASK = Task.LONG_KILL_WORMS;

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
    Isaac.Spawn(
      EntityType.ENTITY_ROUND_WORM,
      0,
      0,
      position,
      Vector.Zero,
      undefined,
    );
  }
}

export function postEntityKill(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  // "room.GetAliveEnemiesCount()" does not work in this callback
  const aliveNPCs = getAliveNPCs();

  if (aliveNPCs.length === 0) {
    taskComplete();
  }
}
