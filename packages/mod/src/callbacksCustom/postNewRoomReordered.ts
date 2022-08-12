import { SkeldRoom } from "common";
import {
  game,
  getRoomStageID,
  getRoomVariant,
  log,
  ModCallbackCustom,
  ModUpgraded,
} from "isaacscript-common";
import { convertPlayerToGhostForm } from "../commands/killed";
import * as lobby from "../features/lobby";
import g from "../globals";
import { getOurPlayer } from "../players";
import { getSkeldRoom } from "../stageAPI";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_ROOM_REORDERED, main);
}

function main() {
  const gameFrameCount = game.GetFrameCount();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();
  const renderFrameCount = Isaac.GetFrameCount();
  const roomStageID = getRoomStageID();
  const roomVariant = getRoomVariant();

  log(
    `MC_POST_NEW_ROOM - ${roomStageID}.${roomVariant} (on stage ${stage}.${stageType}) (game frame ${gameFrameCount}) (render frame ${renderFrameCount})`,
  );

  lobby.postNewRoom();

  checkSetPlayerToGhostForm();
}

function checkSetPlayerToGhostForm() {
  if (g.game === null) {
    return;
  }

  const room = getSkeldRoom();
  if (room === SkeldRoom.LOBBY || room === SkeldRoom.TASK) {
    return;
  }

  const ourPlayer = getOurPlayer();
  if (ourPlayer !== undefined && !ourPlayer.alive) {
    convertPlayerToGhostForm();
  }
}
