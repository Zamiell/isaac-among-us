import { EntityTypeCustom } from "../enums";
import { spawnBlockLine, spawnVent } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnElectricalObjects(): void {
  const nextToTopLeftGridIndex = 17;
  spawnEntity(EntityTypeCustom.ELECTRICAL, 0, 0, nextToTopLeftGridIndex);

  const topLeftGridIndex = 16;
  spawnVent(topLeftGridIndex);

  spawnBlockLine(17, 12, Direction.RIGHT, false);
  spawnBlockLine(32, 12, Direction.RIGHT, false);
}
