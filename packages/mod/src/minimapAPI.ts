export function setMinimapAPIRoomIcon(mapID: int, icon: string): void {
  if (MinimapAPI === undefined) {
    return;
  }

  const minimapAPILevel = MinimapAPI.GetLevel();
  for (const room of minimapAPILevel) {
    if (room.ID === mapID) {
      room.ItemIcons = [icon];
      return;
    }
  }

  // Don't throw an error if the room was not found;
  // we want to gracefully handle the case where the map is not loaded yet
}
