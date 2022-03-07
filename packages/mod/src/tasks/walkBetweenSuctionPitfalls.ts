import { spawnTaskButton } from "../features/buttonSpawn";
import { spawnTeleporter } from "../features/teleporter";
import { spawnBlockLine, spawnSpikesLine } from "../spawnObjects";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

export function walkBetweenSuctionPitfalls(): void {
  const bottomLeftGridIndex = 106;
  spawnTeleporter(bottomLeftGridIndex);

  const aboveTeleporterGridIndex = 91;
  movePlayerToGridIndex(aboveTeleporterGridIndex);

  spawnBlockLine(77, 3, Direction.DOWN);
  spawnBlockLine(27, 3, Direction.DOWN);

  const topRightGridIndex = 28;
  spawnTaskButton(topRightGridIndex, 1);

  spawnSpikesLine(108, 11, Direction.RIGHT);

  spawnSpikesLine(78, 2, Direction.DOWN);
  spawnSpikesLine(64, 2, Direction.DOWN);
  spawnSpikesLine(80, 2, Direction.DOWN);

  spawnSpikesLine(84, 2, Direction.DOWN);
  spawnSpikesLine(70, 2, Direction.DOWN);
  spawnSpikesLine(86, 2, Direction.DOWN);

  spawnSpikesLine(16, 11, Direction.RIGHT);
  spawnSpikesLine(31, 6, Direction.RIGHT);
  spawnSpikesLine(38, 4, Direction.RIGHT);
  spawnSpikesLine(46, 2, Direction.RIGHT);
  spawnSpikesLine(51, 3, Direction.RIGHT);
  spawnSpikesLine(67, 2, Direction.DOWN);
  spawnSpikesLine(87, 2, Direction.DOWN);
  spawnSpikesLine(88, 2, Direction.DOWN);

  for (const gridIndex of [94, 100, 37]) {
    spawnEntity(
      EntityType.ENTITY_PITFALL,
      PitfallVariant.SUCTION_PITFALL,
      0,
      gridIndex,
    );
  }
}
