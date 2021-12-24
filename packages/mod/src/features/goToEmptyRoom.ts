import {
  changeRoom,
  getDoors,
  removeAllEffects,
  removeAllGridEntitiesExceptFor,
  removeAllNPCs,
  removeGridEntity,
  spawnGridEntity,
} from "isaacscript-common";
import { disableMinimapAPI } from "../minimapAPI";

/** We don't use the real starting room since it has controls text. */
export const START_ROOM_INDEX = 86;

// ModCallbacks.MC_POST_GAME_STARTED (15)
export function postGameStarted(): void {
  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const player = Isaac.GetPlayer();
  const sfx = SFXManager();

  changeRoom(START_ROOM_INDEX);
  room.SetClear(true);
  removeAllNPCs();
  removeAllEffects(EffectVariant.POOF01);
  removeAllGridEntitiesExceptFor(
    GridEntityType.GRID_WALL, // 15
    GridEntityType.GRID_DOOR, // 16
  );

  const doors = getDoors();
  for (const door of doors) {
    const gridIndex = door.GetGridIndex();
    removeGridEntity(door);
    spawnGridEntity(GridEntityType.GRID_WALL, gridIndex);
  }
  sfx.Stop(SoundEffect.SOUND_DOOR_HEAVY_CLOSE); // 35
  sfx.Stop(SoundEffect.SOUND_SUMMON_POOF); // 286

  player.Position = centerPos;

  disableMinimapAPI();
}
