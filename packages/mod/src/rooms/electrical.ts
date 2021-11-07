import { runNextFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnVent } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnElectricalObjects(): void {
  const nextToTopLeftGridIndex = 17;
  spawnEntity(EntityTypeCustom.ELECTRICAL, 0, 0, nextToTopLeftGridIndex);

  const topLeftGridIndex = 16;
  spawnVent(topLeftGridIndex);

  runNextFrame(() => {
    addCollision(17, 43);
  });
}
