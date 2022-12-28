import {
  Direction,
  EntityType,
  PokyVariant,
} from "isaac-typescript-definitions";
import { addCollision } from "../collisionObjects";
import { spawnTaskButton } from "../features/buttonSpawn";
import { spawnTeleporter } from "../features/teleporter";
import { mod } from "../mod";
import { spawnFakeBlockLine } from "../spawnObjects";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

export function walkBetweenSlides(): void {
  const topLeftGridIndex = 32;
  movePlayerToGridIndex(topLeftGridIndex);

  const bottomLeftGridIndex = 92;
  spawnTeleporter(bottomLeftGridIndex);

  const rightGridIndex = 72;
  spawnTaskButton(rightGridIndex, 1);

  spawnFakeBlockLine(19, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(19, 49);
  });
  spawnFakeBlockLine(79, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(79, 109);
  });

  spawnFakeBlockLine(21, 2, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(21, 36);
  });
  spawnFakeBlockLine(66, 4, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(66, 111);
  });

  spawnFakeBlockLine(23, 4, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(23, 68);
  });
  spawnFakeBlockLine(98, 2, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(98, 113);
  });

  spawnFakeBlockLine(25, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(25, 55);
  });
  spawnFakeBlockLine(85, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(85, 115);
  });

  const slideGridIndexes = [20, 110, 22, 112, 24, 114];
  for (const gridIndex of slideGridIndexes) {
    spawnEntity(EntityType.POKY, PokyVariant.SLIDE, 0, gridIndex);
  }
}
