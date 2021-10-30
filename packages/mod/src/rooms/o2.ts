import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnO2Objects(): void {
  // Spawn tanks along the top wall
  for (const gridIndex of [17, 20, 23, 26]) {
    spawnEntity(EntityTypeCustom.TANK, 0, 0, gridIndex);
  }

  // Collision for the tanks
  for (const gridIndex of [16, 31, 46]) {
    spawnBlockLine(gridIndex, 12, Direction.RIGHT, false);
  }
}
