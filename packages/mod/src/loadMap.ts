import { MOD_NAME, taskDescriptions } from "./constants";
import * as mapData from "./data/map";
import g from "./globals";
import { setMinimapAPIRoomIcon } from "./minimapAPI";
import { setupPlayerAndUI } from "./setupPlayersAndUI";
import { getStageAPIRoomMapID } from "./stageAPI";
import { SkeldRoom } from "./types/SkeldRoom";

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
  const levelMap = StageAPI.CreateMapFromRoomsList(roomsList);
  StageAPI.InitCustomLevel(levelMap, true);
}

export function setMapToFullVisibility(): void {
  if (MinimapAPI === undefined) {
    return;
  }

  const minimapAPILevel = MinimapAPI.GetLevel();
  for (const room of minimapAPILevel) {
    room.Visited = true;
    room.Clear = true;
    room.DisplayFlags = DisplayFlag.VISIBLE | DisplayFlag.SHOW_ICON;
  }
}

export function setTasksOnMap(): void {
  if (MinimapAPI === undefined || g.game === null) {
    return;
  }

  // The icons go away if the player enters the room, so we must re-apply it on every new room entry
  for (const taskList of Object.values(g.game.ourTasks)) {
    for (const task of taskList) {
      const taskDescription = taskDescriptions[task];
      const taskRoom = taskDescription.room;
      const mapID = getStageAPIRoomMapID(taskRoom);
      Isaac.DebugString(`Task ${task} - ${taskDescription.name}`);
      Isaac.DebugString(`Room ${taskRoom} - ${SkeldRoom[taskRoom]}`);
      if (mapID !== null) {
        setMinimapAPIRoomIcon(mapID, "Item");
        Isaac.DebugString("GETTING HERE 1");
      } else {
        Isaac.DebugString("GETTING HERE 2");
      }
    }
  }
}
