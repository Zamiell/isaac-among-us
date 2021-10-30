import { log } from "isaacscript-common";
import * as sendGameEvents from "../features/sendGameEvents";
import { setTasksOnMap } from "../loadMap";

export function main(this: void): void {
  log("POST_STAGE_API_NEW_ROOM");

  sendGameEvents.postRoomLoad(); // This does not work properly in the PostRoomLoad callback
  setTasksOnMap();
}
