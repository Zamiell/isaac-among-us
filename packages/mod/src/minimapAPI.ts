import { DisplayFlag } from "isaac-typescript-definitions";
import { addFlag } from "isaacscript-common";

// The task room is the final room added.
const TASK_ROOM_MINIMAP_ID = 22;

export function enableMinimapAPI(): void {
  setMinimapAPIEnabled(true);
}

export function disableMinimapAPI(): void {
  setMinimapAPIEnabled(false);
}

export function setMinimapAPIEnabled(enabled: boolean): void {
  if (MinimapAPI === undefined) {
    return;
  }

  MinimapAPI.OverrideConfig.Disable = !enabled;
}

export function setMapToFullVisibility(): void {
  if (MinimapAPI === undefined) {
    return;
  }

  const minimapAPILevel = MinimapAPI.GetLevel();
  for (const room of minimapAPILevel) {
    if (room.ID !== TASK_ROOM_MINIMAP_ID) {
      room.Visited = true;
      room.Clear = true;
      room.DisplayFlags = addFlag(DisplayFlag.VISIBLE, DisplayFlag.SHOW_ICON);
    }
  }
}

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

  // Don't throw an error if the room was not found; we want to gracefully handle the case where the
  // map is not loaded yet.
}
