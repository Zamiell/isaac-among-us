import { spawnGiantPoop } from "isaacscript-common";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import { enableShooting, movePlayerToGridIndex } from "../utils";

export function destroyGiantPoop(): void {
  const centerLeftGridIndex = 62;
  movePlayerToGridIndex(centerLeftGridIndex);
  enableShooting();

  const topLeftGridIndex = 32;
  spawnTeleporter(topLeftGridIndex);

  const centerRightGridIndex = 52;
  spawnGiantPoop(centerRightGridIndex);
}

export function postGridEntityUpdatePoop(gridEntity: GridEntity): void {
  if (gridEntity.State === PoopState.COMPLETELY_DESTROYED) {
    taskComplete();
  }
}
