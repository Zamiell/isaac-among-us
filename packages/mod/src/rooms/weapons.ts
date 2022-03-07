import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../utils";

export function spawnWeaponsObjects(): void {
  const topRightCenterGridIndex = 132;
  spawnEntity(
    EntityTypeCustom.WEAPONS,
    topRightCenterGridIndex,
    0,
    topRightCenterGridIndex,
  );

  spawnBlockLine(103, 3, Direction.RIGHT);
  spawnBlockLine(131, 4, Direction.RIGHT);
  spawnBlockLine(159, 4, Direction.RIGHT);
}
