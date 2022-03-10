import { game, spawnGridEntity } from "isaacscript-common";
import {
  BoxVariant,
  CarpetSubTypeCustom,
  EffectVariantCustom,
  EntityTypeCustom,
} from "./enums";
import { spawnEntity } from "./utils";

function spawnBlock(gridIndex: int, visible = true): GridEntity {
  const gridEntityType = visible
    ? GridEntityType.GRID_ROCKB
    : GridEntityType.GRID_WALL;

  const gridEntity = spawnGridEntity(gridEntityType, gridIndex);
  if (gridEntity === undefined) {
    error(`Failed to spawn a block at grid index: ${gridIndex}`);
  }

  return gridEntity;
}

export function spawnFakeBlock(gridIndex: int): void {
  spawnEntity(
    EntityType.ENTITY_EFFECT,
    EffectVariant.ISAACS_CARPET,
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

function getGridIncrement(direction: Direction) {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  switch (direction) {
    // 0
    case Direction.LEFT: {
      return -1;
    }

    // 1
    case Direction.UP: {
      return -gridWidth;
    }

    // 2
    case Direction.RIGHT: {
      return 1;
    }

    // 3
    case Direction.DOWN: {
      return gridWidth;
    }

    default: {
      error(`Unknown direction: ${direction}`);
      return 0;
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
  spawnGridEntity(GridEntityType.GRID_SPIKES, gridIndex);
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

export function spawnVent(gridIndex: int): void {
  spawnEntity(EntityType.ENTITY_EFFECT, EffectVariantCustom.VENT, 0, gridIndex);
}
