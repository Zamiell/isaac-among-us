import { EntityType } from "isaac-typescript-definitions";
import { spawnTaskButton } from "../features/buttonSpawn";
import { allButtonsPressed } from "../features/buttonSubroutines";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

export function pressButtonsWithGrudge(): void {
  const centerGridIndex = 67;
  movePlayerToGridIndex(centerGridIndex);

  const bottomLeftGridIndex = 73;
  spawnTeleporter(bottomLeftGridIndex);

  const cornerGridIndexes = [16, 28, 106, 118];
  for (const gridIndex of cornerGridIndexes) {
    spawnEntity(EntityType.GRUDGE, 0, 0, gridIndex);
  }

  const buttonGridIndexes: int[] = [19, 25, 109, 115, 61, 43, 103];
  for (const gridIndex of buttonGridIndexes) {
    spawnTaskButton(gridIndex, 1);
  }
}

export function pressButtonsWithGrudgeButtonPressed(): void {
  if (allButtonsPressed()) {
    taskComplete();
  }
}
