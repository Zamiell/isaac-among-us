import {
  BombSubType,
  EntityType,
  GridEntityType,
  PickupVariant,
  RockState,
} from "isaac-typescript-definitions";
import { asNumber, getRandomSeed, spawnGridEntity } from "isaacscript-common";
import { Task } from "../enums/Task";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

const THIS_TASK = Task.SHORT_BOMB_ROCKS;

const NUM_ROCKS_TO_SPAWN = 20;
const TOP_LEFT_GRID_INDEX = 16;
const ONE_BY_ONE_ROOM_HEIGHT_WITHOUT_WALLS = 7;
const ONE_BY_ONE_ROOM_WIDTH = 15;
const LEFT_SIDE_GRID_INDEXES: int[] = [];
for (let i = 0; i < ONE_BY_ONE_ROOM_HEIGHT_WITHOUT_WALLS; i++) {
  const gridIndex = TOP_LEFT_GRID_INDEX + i * ONE_BY_ONE_ROOM_WIDTH;
  LEFT_SIDE_GRID_INDEXES.push(gridIndex);
}

/** Keys are grid indexes. Values are whether or not the rock is broken. */
const rockBrokenMap = new Map<int, boolean>();

export function bombRocks(): void {
  spawnTeleporter(TOP_LEFT_GRID_INDEX);

  const belowTeleporterGridIndex = 46;
  movePlayerToGridIndex(belowTeleporterGridIndex);

  spawnBombs(76);
  spawnBombs(91);
  spawnBombs(106);

  spawnRocks();
}

function spawnBombs(gridIndex: int) {
  const entity = spawnEntity(
    EntityType.PICKUP,
    PickupVariant.BOMB,
    BombSubType.DOUBLE_PACK,
    gridIndex,
  );
  const sprite = entity.GetSprite();
  sprite.SetLastFrame();
}

function spawnRocks() {
  rockBrokenMap.clear();

  for (let i = 0; i < NUM_ROCKS_TO_SPAWN; i++) {
    spawnRock();
  }
}

function spawnRock() {
  const game = Game();
  const room = game.GetRoom();

  let gridIndex: int;
  let gridEntity: GridEntity | undefined;
  do {
    gridIndex = room.GetRandomTileIndex(getRandomSeed());
    gridEntity = room.GetGridEntity(gridIndex);
  } while (
    gridEntity !== undefined ||
    LEFT_SIDE_GRID_INDEXES.includes(gridIndex)
  );

  spawnGridEntity(GridEntityType.ROCK, gridIndex);
  rockBrokenMap.set(gridIndex, false);
}

// ModCallbackCustom.POST_GRID_ENTITY_UPDATE
// GridEntityType.ROCK (2)
export function postGridEntityUpdateRock(gridEntity: GridEntity): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const gridIndex = room.GetGridIndex(gridEntity.Position);
  const broken = gridEntity.State === asNumber(RockState.BROKEN);
  rockBrokenMap.set(gridIndex, broken);

  if (everyRockBroken()) {
    taskComplete();
  }
}

function everyRockBroken() {
  for (const broken of rockBrokenMap.values()) {
    if (!broken) {
      return false;
    }
  }

  return true;
}
