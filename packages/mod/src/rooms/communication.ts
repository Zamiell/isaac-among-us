import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity, spawnGridEntity } from "../util";

export function spawnCommunicationObjects(): void {
  const topLeftGridIndex = 16;
  spawnEntity(EntityTypeCustom.COMPUTER, 0, 0, topLeftGridIndex);
  spawnBlockLine(topLeftGridIndex, 5, Direction.RIGHT);
  const secondRowTopLeftGridIndex = 31;
  spawnBlockLine(secondRowTopLeftGridIndex, 5, Direction.RIGHT);

  const topRightGridIndex = 26;
  spawnEntity(EntityTypeCustom.RADIO, 0, 0, topRightGridIndex);
  spawnBlockLine(topRightGridIndex, 3, Direction.RIGHT);

  const bottomLeftGridIndex = 106;
  spawnGridEntity(GridEntityType.GRID_STATUE, bottomLeftGridIndex);
}
