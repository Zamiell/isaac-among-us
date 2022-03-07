import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../utils";

export function spawnStorageObjects(): void {
  const centerGridIndex = 127;
  spawnEntity(EntityTypeCustom.STORAGE, 0, 0, centerGridIndex, 0);

  spawnBlockLine(68, 4, Direction.RIGHT, false);
  spawnBlockLine(80, 7, Direction.RIGHT, false);
  spawnBlockLine(95, 7, Direction.RIGHT, false);
  spawnBlockLine(108, 9, Direction.RIGHT, false);
  spawnBlockLine(123, 9, Direction.RIGHT, false);
  spawnBlockLine(140, 7, Direction.RIGHT, false);
  spawnBlockLine(156, 6, Direction.RIGHT, false);
  spawnBlockLine(171, 5, Direction.RIGHT, false);
  spawnBlockLine(187, 3, Direction.RIGHT, false);
}
