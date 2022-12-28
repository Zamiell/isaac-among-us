import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnElectricalObjects(): void {
  const nextToTopLeftGridIndex = 17;
  spawnEntity(EntityTypeCustom.ELECTRICAL, 0, 0, nextToTopLeftGridIndex);

  mod.runNextGameFrame(() => {
    addCollision(17, 43);
  });
}
