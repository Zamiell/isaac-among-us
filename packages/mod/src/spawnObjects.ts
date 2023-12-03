import {
  Direction,
  EffectVariant,
  EntityType,
  GridEntityType,
} from "isaac-typescript-definitions";
import { game, spawnGridEntity } from "isaacscript-common";
import { BoxVariant } from "./enums/BoxVariant";
import { CarpetSubTypeCustom } from "./enums/CarpetSubTypeCustom";
import { EntityTypeCustom } from "./enums/EntityTypeCustom";
import { spawnEntity } from "./utils";

function spawnBlock(gridIndex: int, visible = true): GridEntity | undefined {
  const gridEntityType = visible ? GridEntityType.BLOCK : GridEntityType.WALL;

  return spawnGridEntity(gridEntityType, gridIndex);
}

export function spawnFakeBlock(gridIndex: int): Entity {
  return spawnEntity(
    EntityType.EFFECT,
    EffectVariant.CARPET,
    CarpetSubTypeCustom.BLOCK,
    gridIndex,
  );
}

export function spawnFakeBlockLine(
  gridIndex: int,
  num: int,
  direction: Direction,
): void {
  const gridIncrement = getGridIncrement(direction);

  for (let i = 0; i < num; i++) {
    spawnFakeBlock(gridIndex);
    gridIndex += gridIncrement;
  }
}

export function spawnBlockLine(
  gridIndex: int,
  num: int,
  direction: Direction,
  visible = true,
): void {
  const gridIncrement = getGridIncrement(direction);

  for (let i = 0; i < num; i++) {
    spawnBlock(gridIndex, visible);
    gridIndex += gridIncrement;
  }
}

function getGridIncrement(direction: Direction): int {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  switch (direction) {
    // -1
    case Direction.NO_DIRECTION: {
      return error(`Unknown direction: ${direction}`);
    }

    // 0
    case Direction.LEFT: {
      return -1;
    }

    // 1
    case Direction.UP: {
      return gridWidth * -1;
    }

    // 2
    case Direction.RIGHT: {
      return 1;
    }

    // 3
    case Direction.DOWN: {
      return gridWidth;
    }
  }
}

export function spawnBox(gridIndex: int, large: boolean): Entity {
  const variant = large ? BoxVariant.LARGE : BoxVariant.SMALL;
  return spawnEntity(EntityTypeCustom.BOX, variant, 0, gridIndex);
}

export function spawnEngine(gridIndex: int): void {
  spawnEntity(EntityTypeCustom.ENGINE, 0, 0, gridIndex);

  const topLeftBlockGridIndex = gridIndex - 88;
  spawnBlockLine(topLeftBlockGridIndex, 9, Direction.RIGHT);

  const topRightBlockGridIndex = gridIndex - 79;
  spawnBlockLine(topRightBlockGridIndex, 7, Direction.DOWN);

  const bottomLeftBlockGridIndex = gridIndex + 80;
  spawnBlockLine(bottomLeftBlockGridIndex, 9, Direction.RIGHT);

  const electricBoxGridIndex = gridIndex + 108;
  spawnBlockLine(electricBoxGridIndex, 3, Direction.RIGHT, false);
}

function spawnSpikes(gridIndex: int) {
  spawnGridEntity(GridEntityType.SPIKES, gridIndex);
}

export function spawnSpikesLine(
  gridIndex: int,
  num: int,
  direction: Direction,
): void {
  const gridIncrement = getGridIncrement(direction);

  for (let i = 0; i < num; i++) {
    spawnSpikes(gridIndex);
    gridIndex += gridIncrement;
  }
}
