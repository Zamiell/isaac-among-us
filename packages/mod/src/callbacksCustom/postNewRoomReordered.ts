import { SkeldRoom } from "common";
import {
  game,
  getRoomStageID,
  getRoomVariant,
  log,
  ModCallbackCustom,
} from "isaacscript-common";
import { convertPlayerToGhostForm } from "../commands/killed";
import * as lobby from "../features/lobby";
import { g } from "../globals";
import { mod } from "../mod";
import { getOurPlayer } from "../players";
import { getSkeldRoom } from "../stageAPI";

export function init(): void {
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
    `POST_NEW_ROOM_REORDERED - ${roomStageID}.${roomVariant} (on stage ${stage}.${stageType}) (game frame ${gameFrameCount}) (render frame ${renderFrameCount})`,
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
