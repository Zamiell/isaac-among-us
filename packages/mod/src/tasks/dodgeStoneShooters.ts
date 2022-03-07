import { runNextGameFrame, spawnGridEntity } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { spawnTaskButton } from "../features/buttonSpawn";
import { spawnTeleporter } from "../features/teleporter";
import { spawnFakeBlock, spawnFakeBlockLine } from "../spawnObjects";
import {
  movePlayerToGridIndex,
  spawnEntity,
  updatePlayerStats,
} from "../utils";

export function dodgeStoneShooters(): void {
  const leftGridIndex = 61;
  movePlayerToGridIndex(leftGridIndex);
  updatePlayerStats();

  const bottomLeftGridIndex = 91;
  spawnTeleporter(bottomLeftGridIndex);

  const topRightGridIndex = 28;
  spawnTaskButton(topRightGridIndex, 1);

  spawnFakeBlockLine(16, 10, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(16, 25);
  });
  spawnFakeBlockLine(27, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(27, 72);
  });
  spawnOneBlock(106);
  spawnFakeBlockLine(62, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(62, 107);
  });
  spawnFakeBlockLine(48, 2, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(48, 49);
  });
  spawnFakeBlockLine(51, 3, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(51, 53);
  });
  spawnOneBlock(55);
  spawnOneBlock(66);
  spawnOneBlock(68);
  spawnOneBlock(94);
  spawnOneBlock(97);
  spawnFakeBlockLine(100, 3, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(100, 102);
  });

  spawnShooter(Direction.RIGHT, 31);
  spawnShooter(Direction.LEFT, 87);
  spawnShooter(Direction.DOWN, 26);
  spawnShooter(Direction.DOWN, 50);
  spawnShooter(Direction.DOWN, 54);
  spawnShooter(Direction.DOWN, 63);
  spawnShooter(Direction.DOWN, 96);
  spawnShooter(Direction.DOWN, 98);

  const pitGridIndexes: int[] = [65, 69, 95, 99];
  for (const gridIndex of pitGridIndexes) {
    spawnGridEntity(GridEntityType.GRID_PIT, gridIndex);
  }

  const cobwebGridIndexes: int[] = [
    34, 35, 37, 38, 78, 82, 83, 84, 108, 109, 110, 111, 112, 113, 114, 115,
  ];
  for (const gridIndex of cobwebGridIndexes) {
    spawnGridEntity(GridEntityType.GRID_SPIDERWEB, gridIndex);
  }
}

function spawnOneBlock(gridIndex: int) {
  spawnFakeBlock(gridIndex);
  runNextGameFrame(() => {
    addCollision(gridIndex, gridIndex);
  });
}

function spawnShooter(direction: Direction, gridIndex: int) {
  spawnEntity(
    EntityType.ENTITY_CONSTANT_STONE_SHOOTER,
    ConstantStoneShooterVariant.CONSTANT_STONE_SHOOTER,
    direction,
    gridIndex,
  );
}
