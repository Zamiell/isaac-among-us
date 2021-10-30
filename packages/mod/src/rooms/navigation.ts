import { EntityTypeCustom } from "../enums";
import { spawnBlockLine, spawnVent } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnNavigationObjects(): void {
  const rightGridIndex = 73;
  spawnEntity(EntityTypeCustom.SHIP_CONTROLS, 0, 0, rightGridIndex);

  const topRightGridIndex = 28;
  spawnBlockLine(topRightGridIndex, 7, Direction.DOWN, false);
  const secondRowTopRightGridIndex = 27;
  spawnBlockLine(secondRowTopRightGridIndex, 7, Direction.DOWN, false);

  const gridIndexTopLeft = 16;
  spawnVent(gridIndexTopLeft);
  const gridIndexBottomLeft = 106;
  spawnVent(gridIndexBottomLeft);

  // Sometimes, the bottom wall will not load correctly
  // (commented out since it makes the ship controls move to the left, if we need to uncomment this,
  // check for the existence of a wall before spawning it)
  // spawnBlockLine(121, 13, Direction.RIGHT, false);
}
