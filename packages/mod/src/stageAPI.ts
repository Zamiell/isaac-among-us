import g from "./globals";
import { skeldRoomMap } from "./skeldRoomMap";
import { SkeldRoom } from "./types/SkeldRoom";

const NULL_STAGE_API_ANIMATION = -1;

const DEFAULT_BACKDROP_TYPE = "security";
const backdropMap = new Map<SkeldRoom, string>([
  [SkeldRoom.CAFETERIA, "cafeteria"],
  [SkeldRoom.ELECTRICAL, "electrical"],
  [SkeldRoom.SECURITY, "security"],
]);

export function fixRoomEntrancePosition(): void {
  const game = Game();
  const level = game.GetLevel();
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();

  if (level.EnterDoor === -1) {
    return;
  }

  const doorPos = room.GetDoorSlotPosition(level.EnterDoor);
  const playerEnterPos = room.FindFreeTilePosition(doorPos, 0);
  player.Position = playerEnterPos;
}

export function getStageAPIRoomMapID(skeldRoom: SkeldRoom): int | null {
  if (StageAPI === undefined) {
    return null;
  }

  const levelMap = StageAPI.GetCurrentLevelMap();
  for (const roomData of levelMap.Map) {
    const levelRoom = levelMap.GetRoom(roomData);
    if (levelRoom.Layout.Variant === skeldRoom) {
      return roomData.MapID;
    }
  }

  return null;
}

export function getSkeldRoom(): SkeldRoom | null {
  const roomName = getStageAPIRoomName();
  const skeldRoom = skeldRoomMap.get(roomName);
  return skeldRoom === undefined ? null : skeldRoom;
}

export function getStageAPIDoors(): StageAPICustomGridEntity[] {
  if (StageAPI === undefined) {
    error("StageAPI was not initialized.");
  }

  return StageAPI.GetCustomGrids(undefined, "CustomDoor");
}

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

export function goToStageAPIRoom(roomName: string, enterDoor?: int): void {
  if (StageAPI === undefined) {
    return;
  }

  const game = Game();
  const level = game.GetLevel();
  const levelMap = StageAPI.GetCurrentLevelMap();

  const roomID = getStageAPIRoomID(levelMap, roomName);
  if (roomID === null) {
    return;
  }

  StageAPI.ExtraRoomTransition(
    roomID,
    Direction.NO_DIRECTION,
    NULL_STAGE_API_ANIMATION,
    levelMap,
  );

  if (enterDoor !== undefined) {
    level.EnterDoor = enterDoor;
  }
  fixRoomEntrancePosition();
}

function getStageAPIRoomID(
  levelMap: StageAPILevelMap,
  roomName: string,
): int | null {
  for (const roomData of levelMap.Map) {
    const levelRoom = levelMap.GetRoom(roomData);
    if (levelRoom.Layout.Name === roomName) {
      return roomData.MapID;
    }
  }

  return null;
}

export function loadBackdrops(): void {
  if (g.game === null || StageAPI === undefined) {
    return;
  }

  const roomName = getStageAPIRoomName();
  const room = skeldRoomMap.get(roomName);
  if (room === undefined) {
    return;
  }

  let backdropType = backdropMap.get(room);
  if (backdropType === undefined) {
    backdropType = DEFAULT_BACKDROP_TYPE;
  }
  const backdrops = StageAPI.BackdropHelper(
    {
      Walls: ["wall"],
      NFloors: ["nfloor"],
      LFloors: ["lfloor"],
      Corners: ["corner"],
    },
    `gfx/backdrop/${backdropType}/`,
    ".png",
  );
  const backdrop = backdrops[0];
  if (backdrop === undefined) {
    return;
  }
  StageAPI.ChangeBackdrop(backdrop, false, true);
}
