import { GridEntityType } from "isaac-typescript-definitions";
import { spawnGridEntity } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnCommunicationObjects(): void {
  const topLeftGridIndex = 16;
  spawnEntity(EntityTypeCustom.COMPUTER, 0, 0, topLeftGridIndex);

  const topRightGridIndex = 26;
  spawnEntity(EntityTypeCustom.RADIO, 0, 0, topRightGridIndex);

  const bottomLeftGridIndex = 106;
  spawnGridEntity(GridEntityType.STATUE, bottomLeftGridIndex);

  mod.runNextGameFrame(() => {
    addCollision(16, 35, -20); // Top-left
    addCollision(26, 28); // Top-right
  });
}
