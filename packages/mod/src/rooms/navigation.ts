import { runNextGameFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnVent } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnNavigationObjects(): void {
  const rightGridIndex = 73;
  spawnEntity(EntityTypeCustom.SHIP_CONTROLS, 0, 0, rightGridIndex);

  const gridIndexTopLeft = 16;
  spawnVent(gridIndexTopLeft);
  const gridIndexBottomLeft = 106;
  spawnVent(gridIndexBottomLeft);

  runNextGameFrame(() => {
    addCollision(27, 118);
  });
}
