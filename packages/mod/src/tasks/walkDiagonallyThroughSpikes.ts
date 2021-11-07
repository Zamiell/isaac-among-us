import { spawnGridEntity } from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { spawnTeleporter } from "../features/teleporter";
import { movePlayerToGridIndex } from "../util";

export function walkDiagonallyThroughSpikes(): void {
  const topLeftGridIndex = 32;
  movePlayerToGridIndex(topLeftGridIndex);

  const bottomLeftGridIndex = 92;
  spawnTeleporter(bottomLeftGridIndex);

  const bottomRightGridIndex = 117;
  spawnTaskButton(bottomRightGridIndex, 1);

  const spikeGridIndexes: int[] = [
    19, 20, 21, 22, 23, 25, 26, 27, 28, 34, 35, 36, 37, 39, 41, 42, 43, 49, 50,
    51, 53, 54, 55, 57, 58, 65, 67, 68, 69, 71, 72, 73, 79, 81, 82, 83, 85, 86,
    87, 88, 94, 95, 96, 97, 98, 99, 101, 102, 103, 109, 110, 111, 112, 113, 114,
    115, 118,
  ];
  for (const gridIndex of spikeGridIndexes) {
    spawnGridEntity(GridEntityType.GRID_SPIKES, gridIndex);
  }
}
