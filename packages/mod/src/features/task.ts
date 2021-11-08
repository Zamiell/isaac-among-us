import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { taskFunctions } from "../taskFunctions";
import { clearRoomEntities } from "./taskSubroutines";

export function postStageAPINewRoom(): void {
  setupTaskRoom();
}

function setupTaskRoom() {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  enableMinimapAPI(false);
  clearRoomEntities();

  const taskFunction = taskFunctions.get(g.game.currentTask);
  if (taskFunction !== undefined) {
    taskFunction();
  }

  g.game.startTaskTime = Isaac.GetTime();
}
