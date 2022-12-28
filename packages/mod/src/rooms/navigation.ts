import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnNavigationObjects(): void {
  const rightGridIndex = 73;
  spawnEntity(EntityTypeCustom.SHIP_CONTROLS, 0, 0, rightGridIndex);

  mod.runNextGameFrame(() => {
    addCollision(27, 118);
  });
}
