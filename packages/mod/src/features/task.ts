import { SkeldRoom } from "common";
import g from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { getSkeldRoom } from "../stageAPI";
import { taskFunctions } from "../taskFunctions";
import { fakeTask } from "../tasks/fakeTask";
import { amImposter } from "../utils";
import { clearRoomEntities } from "./taskSubroutines";

export function postStageAPINewRoom(): void {
  setupTaskRoom();
}

function setupTaskRoom() {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  disableMinimapAPI();
  clearRoomEntities();

  if (amImposter()) {
    fakeTask();
  } else {
    const taskFunction = taskFunctions.get(g.game.currentTask);
    if (taskFunction !== undefined) {
      taskFunction();
    }
  }

  g.game.startTaskTime = Isaac.GetTime();
}

export function inTask(): boolean {
  const skeldRoom = getSkeldRoom();
  return skeldRoom === SkeldRoom.TASK;
}
