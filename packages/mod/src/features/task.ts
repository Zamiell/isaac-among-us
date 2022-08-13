import { FAKE_TASK, SkeldRoom } from "common";
import g from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { getSkeldRoom } from "../stageAPI";
import { taskFunctions } from "../taskFunctions";
import { fakeTask } from "../tasks/fakeTask";
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

  if (g.game.currentTask === FAKE_TASK) {
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
