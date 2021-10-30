import { getRoomStageID, getRoomVariant, log } from "isaacscript-common";
import * as lobby from "../features/lobby";

export function main(): void {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();
  const roomStageID = getRoomStageID();
  const roomVariant = getRoomVariant();

  log(
    `MC_POST_NEW_ROOM - ${roomStageID}.${roomVariant} (on stage ${stage}.${stageType}) (game frame ${gameFrameCount})`,
  );

  lobby.postNewRoom();
}
