import { getStageAPIDoors } from "../stageAPI";

export function postRoomLoad(firstLoad: boolean): void {
  if (StageAPI === undefined || !firstLoad) {
    return;
  }

  const doors = getStageAPIDoors();
  for (const door of doors) {
    door.PersistentData.TransitionAnim = -1;
  }
}
