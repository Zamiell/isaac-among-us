import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnSecurityObjects(): void {
  const rightWallGridIndex = 73;
  spawnEntity(EntityTypeCustom.SECURITY_TABLE, 0, 0, rightWallGridIndex);

  mod.runNextGameFrame(() => {
    addCollision(57, 88);
    addCollision(103);
  });
}
