import { runNextGameFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { spawnVent } from "../spawnObjects";
import { spawnEntity } from "../utils";

export function spawnElectricalObjects(): void {
  const nextToTopLeftGridIndex = 17;
  spawnEntity(EntityTypeCustom.ELECTRICAL, 0, 0, nextToTopLeftGridIndex);

  const topLeftGridIndex = 16;
  spawnVent(topLeftGridIndex);

  runNextGameFrame(() => {
    addCollision(17, 43);
  });
}
