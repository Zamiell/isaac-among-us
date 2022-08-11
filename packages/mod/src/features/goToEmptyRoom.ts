import {
  BackdropType,
  EffectVariant,
  GridEntityType,
  SoundEffect,
} from "isaac-typescript-definitions";
import {
  changeRoom,
  getDoors,
  removeAllEffects,
  removeAllGridEntitiesExcept,
  removeAllNPCs,
  removeGridEntity,
  setBackdrop,
  sfxManager,
  spawnGridEntity,
} from "isaacscript-common";
import { disableMinimapAPI } from "../minimapAPI";

/** We don't use the real starting room since it has controls text. */
export const START_ROOM_INDEX = 86;

// ModCallback.POST_GAME_STARTED (15)
export function postGameStarted(): void {
  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const player = Isaac.GetPlayer();

  changeRoom(START_ROOM_INDEX);
  room.SetClear(true);
  removeAllNPCs();
  removeAllEffects(EffectVariant.POOF_1);
  removeAllGridEntitiesExcept(
    GridEntityType.WALL, // 15
    GridEntityType.DOOR, // 16
  );

  const doors = getDoors();
  for (const door of doors) {
    const gridIndex = door.GetGridIndex();
    removeGridEntity(door, true);
    spawnGridEntity(GridEntityType.WALL, gridIndex);
  }
  sfxManager.Stop(SoundEffect.DOOR_HEAVY_CLOSE); // 35
  sfxManager.Stop(SoundEffect.SUMMON_POOF); // 286

  player.Position = centerPos;

  setBackdrop(BackdropType.DARK_ROOM);

  disableMinimapAPI();
}
