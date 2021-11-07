import { runNextFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnEntity } from "../util";

export function spawnSecurityObjects(): void {
  const rightWallGridIndex = 73;
  spawnEntity(EntityTypeCustom.SECURITY_TABLE, 0, 0, rightWallGridIndex);

  runNextFrame(() => {
    addCollision(57, 88);
    addCollision(103);
  });
}
