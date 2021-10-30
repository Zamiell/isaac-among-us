import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnShieldsObjects(): void {
  const gridIndex = 111;
  spawnEntity(EntityTypeCustom.SHIELDS, 0, 0, gridIndex, -500);

  const bottomLeftGridIndex = 211;
  spawnBlockLine(bottomLeftGridIndex, 13, Direction.RIGHT);
  const secondRowBottomLeftGridIndex = 196;
  spawnBlockLine(secondRowBottomLeftGridIndex, 13, Direction.RIGHT);

  // Above door
  spawnBlockLine(151, 5, Direction.RIGHT);
  spawnBlockLine(136, 5, Direction.RIGHT);
  spawnBlockLine(121, 3, Direction.RIGHT);
  spawnBlockLine(106, 2, Direction.RIGHT);

  // Right side of room, starting at the bottom
  spawnBlockLine(187, 7, Direction.RIGHT);
  spawnBlockLine(173, 6, Direction.RIGHT);
  spawnBlockLine(159, 5, Direction.RIGHT);
  spawnBlockLine(144, 5, Direction.RIGHT);
  spawnBlockLine(129, 5, Direction.RIGHT);
  spawnBlockLine(115, 4, Direction.RIGHT);
  spawnBlockLine(100, 4, Direction.RIGHT);
  spawnBlockLine(100, 4, Direction.RIGHT);
  spawnBlockLine(84, 4, Direction.RIGHT);
  spawnBlockLine(69, 4, Direction.RIGHT);
  spawnBlockLine(54, 4, Direction.RIGHT);

  // Top left of room
  spawnBlockLine(61, 3, Direction.RIGHT);
  spawnBlockLine(46, 4, Direction.RIGHT);
  spawnBlockLine(31, 4, Direction.RIGHT);
  spawnBlockLine(16, 13, Direction.RIGHT);
}
