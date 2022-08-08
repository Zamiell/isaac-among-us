import { EntityType } from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";
import { Task } from "../enums/Task";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { enableShooting, movePlayerToGridIndex } from "../utils";

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
    EntityType.MONSTRO,
    0,
    position,
    VectorZero,
    undefined,
    0,
    1 as Seed, // A seed of 1 is guaranteed to not be a champion
  );

  // With the vanilla amount of HP, it takes 67 seconds to kill. Thus, we need to reduce the HP to
  // make the length of this task in line with other tasks.
  monstro.HitPoints *= 0.45;
}

export function postUpdate(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const numMonstros = Isaac.CountEntities(undefined, EntityType.MONSTRO);
  if (numMonstros === 0) {
    taskComplete();
  }
}
