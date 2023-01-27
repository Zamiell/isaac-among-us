import { SkeldRoom } from "common";
import {
  Direction,
  DoorSlot,
  RoomTransitionAnim,
} from "isaac-typescript-definitions";
import { asNumber, game } from "isaacscript-common";
import { inLobby } from "./features/lobby";
import { sendRoom } from "./features/sendGameEvents";
import { g } from "./globals";
import { getSkeldRoomFromName } from "./skeldRoomMap";
import { getStageAPIRoomName } from "./stageAPISubroutines";

const BACKDROP_MAP: ReadonlyMap<SkeldRoom, string> = new Map([
  [SkeldRoom.CAFETERIA, "cafeteria"],
  [SkeldRoom.ELECTRICAL, "electrical"],
  [SkeldRoom.SECURITY, "security"],
]);
const DEFAULT_BACKDROP_TYPE = "security";
const NULL_STAGE_API_ANIMATION = -1 as RoomTransitionAnim;

export function getStageAPIRoomMapID(skeldRoom: SkeldRoom): int | undefined {
  if (StageAPI === undefined) {
    return undefined;
  }

  const levelMap = StageAPI.GetCurrentLevelMap();
  const matchingRoomData = levelMap.Map.find((roomData) => {
    const levelRoom = levelMap.GetRoom(roomData);
    return levelRoom.Layout.Variant === asNumber(skeldRoom);
  });

  return matchingRoomData === undefined ? undefined : matchingRoomData.MapID;
}

export function getSkeldRoom(): SkeldRoom | undefined {
  if (inLobby()) {
    return SkeldRoom.LOBBY;
  }

  const roomName = getStageAPIRoomName();
  if (roomName === undefined) {
    return undefined;
  }

  return getSkeldRoomFromName(roomName);
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

  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const levelMap = StageAPI.GetCurrentLevelMap();

  const roomID = getStageAPIRoomID(levelMap, roomName);
  if (roomID === undefined) {
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
  const level = game.GetLevel();
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();

  if (level.EnterDoor === DoorSlot.NO_DOOR_SLOT) {
    return;
  }

  const doorPos = room.GetDoorSlotPosition(level.EnterDoor);
  const playerEnterPos = room.FindFreeTilePosition(doorPos, 0);
  player.Position = playerEnterPos;
}

function getStageAPIRoomID(
  levelMap: StageAPILevelMap,
  roomName: string,
): int | undefined {
  const matchingRoomData = levelMap.Map.find((roomData) => {
    const levelRoom = levelMap.GetRoom(roomData);
    return levelRoom.Layout.Name === roomName;
  });

  return matchingRoomData === undefined ? undefined : matchingRoomData.MapID;
}

export function loadBackdrops(): void {
  if (g.game === null || StageAPI === undefined) {
    return;
  }

  const roomName = getStageAPIRoomName();
  if (roomName === undefined) {
    return undefined;
  }

  const room = getSkeldRoomFromName(roomName);
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
      NFloors: ["nfloor"], // cspell:disable-line
      LFloors: ["lfloor"], // cspell:disable-line
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
