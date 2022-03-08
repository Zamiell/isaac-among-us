import { sendRoom } from "./features/sendGameEvents";
import g from "./globals";
import { skeldRoomMap } from "./skeldRoomMap";
import { getStageAPIRoomName } from "./stageAPISubroutines";
import { SkeldRoom } from "./types/SkeldRoom";

const BACKDROP_MAP: ReadonlyMap<SkeldRoom, string> = new Map([
  [SkeldRoom.CAFETERIA, "cafeteria"],
  [SkeldRoom.ELECTRICAL, "electrical"],
  [SkeldRoom.SECURITY, "security"],
]);
const DEFAULT_BACKDROP_TYPE = "security";
const NULL_STAGE_API_ANIMATION = -1;

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

export function goToStageAPIRoom(
  roomName: string,
  customGridIndex?: int,
): void {
  if (StageAPI === undefined) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const levelMap = StageAPI.GetCurrentLevelMap();

  const roomID = getStageAPIRoomID(levelMap, roomName);
  if (roomID === null) {
    error(`Failed to get the room ID for: ${roomName}`);
  }

  StageAPI.ExtraRoomTransition(
    roomID,
    Direction.NO_DIRECTION,
    NULL_STAGE_API_ANIMATION,
    levelMap,
  );

  fixRoomEntrancePosition();

  if (customGridIndex !== undefined) {
    player.Position = room.GetGridPosition(customGridIndex);
  }

  sendRoom();
}

function fixRoomEntrancePosition() {
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

  let backdropType = BACKDROP_MAP.get(room);
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
