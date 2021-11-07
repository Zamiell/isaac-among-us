const ONE_BY_ONE_ROOM_WIDTH = 15;
const ONE_BY_ONE_ROOM_HEIGHT = 9;

const TOP_LEFT_GRID_INDEX = 0;
const TOP_WALL_GRID_INDEXES: int[] = [];
for (
  let i = TOP_LEFT_GRID_INDEX;
  i < TOP_LEFT_GRID_INDEX + ONE_BY_ONE_ROOM_WIDTH;
  i++
) {
  TOP_WALL_GRID_INDEXES.push(i);
}

const BOTTOM_LEFT_GRID_INDEX = 120;
const BOTTOM_WALL_GRID_INDEXES: int[] = [];
for (
  let i = BOTTOM_LEFT_GRID_INDEX;
  i < BOTTOM_LEFT_GRID_INDEX + ONE_BY_ONE_ROOM_WIDTH;
  i++
) {
  BOTTOM_WALL_GRID_INDEXES.push(i);
}

const LEFT_WALL_GRID_INDEXES: int[] = [];
for (let i = 0; i < ONE_BY_ONE_ROOM_HEIGHT; i++) {
  const gridIndex = TOP_LEFT_GRID_INDEX + i * ONE_BY_ONE_ROOM_WIDTH;
  LEFT_WALL_GRID_INDEXES.push(gridIndex);
}

const TOP_RIGHT_GRID_INDEX = 14;
const RIGHT_WALL_GRID_INDEXES: int[] = [];
for (let i = 0; i < ONE_BY_ONE_ROOM_HEIGHT; i++) {
  const gridIndex = TOP_RIGHT_GRID_INDEX + i * ONE_BY_ONE_ROOM_WIDTH;
  RIGHT_WALL_GRID_INDEXES.push(gridIndex);
}

const ALL_WALL_GRID_INDEXES = new Set<int>();
for (const gridIndexArray of [
  TOP_WALL_GRID_INDEXES,
  BOTTOM_WALL_GRID_INDEXES,
  LEFT_WALL_GRID_INDEXES,
  RIGHT_WALL_GRID_INDEXES,
]) {
  for (const gridIndex of gridIndexArray) {
    ALL_WALL_GRID_INDEXES.add(gridIndex);
  }
}

/** This will only work properly for 1x1 rooms. */
export function isWallGridIndex(gridIndex: int): boolean {
  return ALL_WALL_GRID_INDEXES.has(gridIndex);
}
