import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnO2Objects(): void {
  // Spawn tanks along the top wall.
  for (const gridIndex of [17, 20, 23, 26]) {
    spawnEntity(EntityTypeCustom.TANK, 0, 0, gridIndex);
  }

  mod.runNextGameFrame(() => {
    addCollision(16, 57);
  });
}
