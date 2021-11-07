import { log } from "isaacscript-common";
import * as sendGameEvents from "../features/sendGameEvents";
import * as task from "../features/task";
import g from "../globals";
import { setTasksOnMap } from "../loadMap";
import { getStageAPIRoomName, goToStageAPIRoom } from "../stageAPI";

const NORMAL_TOP_LEFT_POS = Vector(60, 140);

let warping = false;

export function main(this: void): void {
  log("POST_STAGE_API_NEW_ROOM");

  if (warping) {
    log("Warping; returning early.");
    return;
  }

  sendGameEvents.postRoomLoad(); // This does not work properly in the PostRoomLoad callback
  setTasksOnMap();
  fixOffsetBug();
  task.postStageAPINewRoom();
}

function fixOffsetBug() {
  // Under certain conditions (like walking to a room in a certain way),
  // StageAPI will offset the room by one row, causing all kinds of other bugs,
  // such as objects being moved
  // Try to detect this condition
  const game = Game();
  const room = game.GetRoom();
  const topLeftPos = room.GetTopLeftPos();
  if (
    topLeftPos.X !== NORMAL_TOP_LEFT_POS.X ||
    topLeftPos.Y !== NORMAL_TOP_LEFT_POS.Y
  ) {
    log("Bugged room detected; attempting a warp fix.");
    warpToCafeteriaAndBack();
  }
}

function warpToCafeteriaAndBack() {
  if (StageAPI === undefined || g.game === null) {
    return;
  }

  const game = Game();
  const level = game.GetLevel();
  const roomName = getStageAPIRoomName();

  warping = true;
  const enterDoor = level.EnterDoor;
  goToStageAPIRoom("Cafeteria");
  level.EnterDoor = enterDoor;
  goToStageAPIRoom(roomName, enterDoor);
  warping = false;
}
