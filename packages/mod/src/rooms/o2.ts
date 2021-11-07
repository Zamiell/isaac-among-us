import { runNextFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnEntity } from "../util";

export function spawnO2Objects(): void {
  // Spawn tanks along the top wall
  for (const gridIndex of [17, 20, 23, 26]) {
    spawnEntity(EntityTypeCustom.TANK, 0, 0, gridIndex);
  }

  runNextFrame(() => {
    addCollision(16, 57);
  });
}
