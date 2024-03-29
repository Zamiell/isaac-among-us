import {
  Direction,
  EntityType,
  GridEntityType,
  KeySubType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { spawnGridEntity } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { spawnTaskButton } from "../features/buttonSpawn";
import { spawnTeleporter } from "../features/teleporter";
import { mod } from "../mod";
import { spawnFakeBlockLine } from "../spawnObjects";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

export function dodgeRetractingSpikes(): void {
  const leftGridIndex = 62;
  movePlayerToGridIndex(leftGridIndex);

  const bottomLeftGridIndex = 107;
  spawnTeleporter(bottomLeftGridIndex);

  spawnFakeBlockLine(19, 7, Direction.RIGHT);
  mod.runNextGameFrame(() => {
    addCollision(19, 25);
  });
  spawnFakeBlockLine(34, 7, Direction.RIGHT);
  mod.runNextGameFrame(() => {
    addCollision(34, 40);
  });
  spawnFakeBlockLine(51, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(51, 81);
  });
  spawnFakeBlockLine(53, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(53, 83);
  });
  spawnFakeBlockLine(64, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(64, 94);
  });
  spawnFakeBlockLine(70, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(70, 100);
  });
  spawnFakeBlockLine(109, 7, Direction.RIGHT);
  mod.runNextGameFrame(() => {
    addCollision(109, 115);
  });
  spawnFakeBlockLine(27, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(27, 57);
  });
  spawnFakeBlockLine(87, 3, Direction.DOWN);
  mod.runNextGameFrame(() => {
    addCollision(87, 117);
  });

  spawnGridEntity(GridEntityType.LOCK, 72);
  spawnTaskButton(73, 1);

  const retractingSpikesGridIndexes: int[] = [
    49, 50, 65, 80, 95, 96, 97, 98, 99, 54, 69, 84, 55, 67, 82,
  ];
  for (const gridIndex of retractingSpikesGridIndexes) {
    spawnGridEntity(GridEntityType.SPIKES_ON_OFF, gridIndex);
  }

  spawnKey(52);
}

function spawnKey(gridIndex: int) {
  const entity = spawnEntity(
    EntityType.PICKUP,
    PickupVariant.KEY,
    KeySubType.NORMAL,
    gridIndex,
  );
  const sprite = entity.GetSprite();
  sprite.SetLastFrame();
}
