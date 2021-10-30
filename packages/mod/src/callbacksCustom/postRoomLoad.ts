import { log } from "isaacscript-common";
import * as disableRoomTransitionAnimation from "../features/disableRoomTransitionAnimation";
import * as roomObjects from "../features/roomObjects";
import * as stageAPI from "../stageAPI";

export function main(
  this: void,
  _currentRoom: StageAPILevelRoom,
  firstLoad: boolean,
): void {
  log(`POST_ROOM_LOAD - firstLoad: ${firstLoad}`);

  disableRoomTransitionAnimation.postRoomLoad(firstLoad);
  roomObjects.postRoomLoad();
  stageAPI.loadBackdrops();
}
