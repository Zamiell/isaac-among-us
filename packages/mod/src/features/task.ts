import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { getStageAPIRoomName } from "../stageAPI";
import { taskFunctions } from "../taskFunctions";
import { clearRoomEntities } from "./taskSubroutines";

export function inTask(): boolean {
  const roomName = getStageAPIRoomName();
  return roomName === "Task";
}

export function postStageAPINewRoom(): void {
  setupTaskRoom();
}

function setupTaskRoom() {
  if (!inTask() || g.game === null || g.game.currentTask === null) {
    return;
  }

  enableMinimapAPI(false);
  clearRoomEntities();

  const taskFunction = taskFunctions.get(g.game.currentTask);
  if (taskFunction !== undefined) {
    taskFunction();
  }
}
