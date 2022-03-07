import { runNextGameFrame, spawnGridEntity } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { spawnTaskButton } from "../features/buttonSpawn";
import { allButtonsPressed } from "../features/buttonSubroutines";
import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import { spawnFakeBlockLine } from "../spawnObjects";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

export function buttonsBehindKeyBlocks(): void {
  const leftGridIndex = 62;
  movePlayerToGridIndex(leftGridIndex);

  const topRightGridIndex = 42;
  spawnTeleporter(topRightGridIndex);

  spawnKeys(35);
  spawnKeys(36);
  spawnKeys(37);
  spawnKeys(38);
  spawnKeys(39);

  spawnTaskButton(110, 1);
  spawnTaskButton(112, 1);
  spawnTaskButton(114, 1);

  spawnFakeBlockLine(64, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(64, 109);
  });
  spawnFakeBlockLine(66, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(66, 111);
  });
  spawnFakeBlockLine(68, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(68, 113);
  });
  spawnFakeBlockLine(70, 4, Direction.DOWN);
  runNextGameFrame(() => {
    addCollision(70, 115);
  });

  spawnGridEntity(GridEntityType.GRID_LOCK, 65);
  spawnGridEntity(GridEntityType.GRID_LOCK, 80);
  spawnGridEntity(GridEntityType.GRID_LOCK, 95);

  spawnGridEntity(GridEntityType.GRID_LOCK, 67);
  spawnGridEntity(GridEntityType.GRID_LOCK, 82);
  spawnGridEntity(GridEntityType.GRID_LOCK, 97);

  spawnGridEntity(GridEntityType.GRID_LOCK, 69);
  spawnGridEntity(GridEntityType.GRID_LOCK, 84);
  spawnGridEntity(GridEntityType.GRID_LOCK, 99);
}

function spawnKeys(gridIndex: int) {
  const entity = spawnEntity(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_KEY,
    KeySubType.KEY_DOUBLEPACK,
    gridIndex,
  );
  const sprite = entity.GetSprite();
  sprite.SetLastFrame();
}

export function buttonsBehindKeyBlocksButtonPressed(): void {
  if (allButtonsPressed()) {
    taskComplete();
  }
}
