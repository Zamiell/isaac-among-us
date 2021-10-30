import { DISTANCE_OF_GRID_TILE } from "isaacscript-common";
import g from "./globals";
import { skeldRoomMap } from "./skeldRoomMap";
import { SkeldRoom } from "./types/SkeldRoom";

const BUG_FIX_OFFSET = Vector(0, DISTANCE_OF_GRID_TILE * -1);
const NULL_STAGE_API_ANIMATION = -1;

const DEFAULT_BACKDROP_TYPE = "security";
const backdropMap = new Map<SkeldRoom, string>([
  [SkeldRoom.CAFETERIA, "cafeteria"],
  [SkeldRoom.ELECTRICAL, "electrical"],
  [SkeldRoom.SECURITY, "security"],
]);

const topOfRoomPositionMap = new Map<RoomShape, Vector>([
  [RoomShape.ROOMSHAPE_1x1, Vector(320, 160)], // 1
  [RoomShape.ROOMSHAPE_1x2, Vector(320, 160)], // 4
]);

export function fixRoomEntrancePosition(): void {
  const level = g.g.GetLevel();
  const room = g.g.GetRoom();
  const roomShape = room.GetRoomShape();
  const player = Isaac.GetPlayer();

  if (level.EnterDoor === -1) {
    return;
  }

  const doorPos = room.GetDoorSlotPosition(level.EnterDoor);
  let playerEnterPos = room.FindFreeTilePosition(doorPos, 0);

  // StageAPI has a bug where sometimes the chosen position will be outside the bounds of the room,
  // causing the player to immediately warp back to the previous room
  // Fix this by detecting if the current room is offset and adjusting the starting position
  // accordingly
  // (but only if they are entering from the bottom door)
  const topOfRoomPosition = topOfRoomPositionMap.get(roomShape);
  if (topOfRoomPosition !== undefined) {
    const roomIsBugged = !room.IsPositionInRoom(topOfRoomPosition, 0);
    if (roomIsBugged && level.EnterDoor === DoorSlot.DOWN0) {
      playerEnterPos = playerEnterPos.add(BUG_FIX_OFFSET);
    }
  }

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

export function goToStageAPIRoom(roomName: string, enterDoor: int): void {
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

  level.EnterDoor = enterDoor;
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
