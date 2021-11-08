import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { enableShooting, movePlayerToGridIndex } from "../util";

const THIS_TASK = Task.LONG_DEFEAT_MONSTRO;
const MONSTRO_GRID_INDEX = 52;

export function defeatMonstro(): void {
  const bottomGridIndex = 97;
  movePlayerToGridIndex(bottomGridIndex);
  enableShooting();

  const bottomLeftGridIndex = 106;
  spawnTeleporter(bottomLeftGridIndex);

  spawnMonstro();
}

function spawnMonstro() {
  const game = Game();
  const room = game.GetRoom();
  const position = room.GetGridPosition(MONSTRO_GRID_INDEX);

  const monstro = game.Spawn(
    EntityType.ENTITY_MONSTRO,
    0,
    position,
    Vector.Zero,
    undefined,
    0,
    1,
  );

  // With the vanilla amount of HP, it takes 67 seconds to kill
  // Thus, we need to reduce the HP to make the length of this task in line with other tasks
  monstro.HitPoints *= 0.45;
}

export function postUpdate(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const monstros = Isaac.FindByType(EntityType.ENTITY_MONSTRO);
  if (monstros.length === 0) {
    taskComplete();
  }
}
