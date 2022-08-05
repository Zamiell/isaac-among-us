import { MOD_NAME, taskDescriptions } from "./constants";
import * as mapData from "./data/map";
import g from "./globals";
import { setMapToFullVisibility, setMinimapAPIRoomIcon } from "./minimapAPI";
import { setupPlayerAndUI } from "./setupPlayersAndUI";
import { getStageAPIRoomMapID } from "./stageAPI";

const MAP_ROOM_VARIANT = 99; // Set in the "map.xml" file

export function loadMap(): void {
  setupPlayerAndUI();
  loadStageAPICustomLevel();
  setMapToFullVisibility();
  setTasksOnMap();
}

function loadStageAPICustomLevel() {
  if (StageAPI === undefined) {
    return;
  }

  const roomsList = StageAPI.RoomsList(MOD_NAME, mapData);
  const levelMap = StageAPI.CreateMapFromRoomsList(roomsList, MAP_ROOM_VARIANT);
  StageAPI.InitCustomLevel(levelMap, true);
}

export function setTasksOnMap(): void {
  if (g.game === null) {
    return;
  }

  // The icons go away if the player enters the room, so we must re-apply it on every new room
  // entry.
  for (const taskList of Object.values(g.game.ourTasks)) {
    for (const task of taskList) {
      const taskDescription = taskDescriptions[task];
      const taskRoom = taskDescription.room;
      const mapID = getStageAPIRoomMapID(taskRoom);
      if (mapID !== undefined) {
        setMinimapAPIRoomIcon(mapID, "Item");
      }
    }
  }
}
