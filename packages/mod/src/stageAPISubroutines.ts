export function getStageAPIRoomName(): string | undefined {
  if (StageAPI === undefined) {
    return undefined;
  }

  const stageAPIRoom = StageAPI.GetCurrentRoom();
  if (stageAPIRoom === undefined) {
    return undefined;
  }

  return stageAPIRoom.Layout.Name;
}
