import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnSecurityObjects(): void {
  const rightWallGridIndex = 73;
  spawnEntity(EntityTypeCustom.SECURITY_TABLE, 0, 0, rightWallGridIndex);

  spawnBlockLine(57, 2, Direction.RIGHT, false);
  spawnBlockLine(72, 2, Direction.RIGHT, false);
  spawnBlockLine(87, 2, Direction.RIGHT, false);
  spawnBlockLine(103, 1, Direction.RIGHT, false);
}
