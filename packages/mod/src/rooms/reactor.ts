import { Direction } from "isaac-typescript-definitions";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../utils";

export function spawnReactorObjects(): void {
  const centerGridIndex = 52;
  spawnEntity(EntityTypeCustom.REACTOR, 0, 0, centerGridIndex, 0);

  spawnBlockLine(51, 3, Direction.RIGHT, false);
  spawnBlockLine(66, 3, Direction.RIGHT, false);
}
