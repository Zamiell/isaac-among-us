import { getPlayerCloserThan, log, spawnGridEntity } from "isaacscript-common";
import g from "../globals";
import { taskLeave } from "./taskSubroutines";

const TELEPORTER_ACTIVATION_DISTANCE = 20; // Exactly the same as a vanilla teleporter

export function spawnTeleporter(gridIndex: int): void {
  spawnGridEntity(GridEntityType.GRID_TELEPORTER, gridIndex);
}

export function postGridEntityUpdateTeleporter(gridEntity: GridEntity): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const playerTouching = getPlayerCloserThan(
    gridEntity.Position,
    TELEPORTER_ACTIVATION_DISTANCE,
  );
  if (playerTouching === undefined) {
    return;
  }

  log("Player touched teleporter.");
  taskLeave();
}
