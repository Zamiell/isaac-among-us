export function getStageAPIRoomName(): string {
  const defaultReturn = "Unknown";

  if (StageAPI === undefined) {
    return defaultReturn;
  }

  const stageAPIRoom = StageAPI.GetCurrentRoom();
  if (stageAPIRoom === undefined) {
    return defaultReturn;
  }

  return stageAPIRoom.Layout.Name;
}
