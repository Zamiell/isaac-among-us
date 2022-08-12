import { spawnTeleporter } from "../features/teleporter";
import { movePlayerToGridIndex } from "../utils";

export function fakeTask(): void {
  const leftCenterGridIndex = 64;
  movePlayerToGridIndex(leftCenterGridIndex);

  const rightCenterGridIndex = 70;
  spawnTeleporter(rightCenterGridIndex);
}
