import { GridRoom, StageID, StageType } from "isaac-typescript-definitions";
import {
  asNumber,
  forceNewLevelCallback,
  forceNewRoomCallback,
  getEffectiveStage,
  getNPCs,
  getPlayers,
  getRoomGridIndex,
  getRoomStageID,
  getRoomVariant,
  removeAllDoors,
  removeEntities,
} from "isaacscript-common";
import g from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { setupPlayerAndUI } from "../setupPlayersAndUI";
import { spawnBox } from "../spawnObjects";
import { consoleCommand } from "../utils";

// We use the Cellar because it is the cleanest floor.
const STAGE_ARGUMENT_FOR_LOBBY = "1a";
const STAGE_FOR_LOBBY = 1;
const STAGE_TYPE_FOR_LOBBY = StageType.WRATH_OF_THE_LAMB;
const STAGE_ID_FOR_LOBBY = StageID.CELLAR;
// We use a room with no grid entities and a single Gaper.
const ROOM_VARIANT_FOR_LOBBY = 5;

// ModCallback.POST_NEW_ROOM (19)
export function postNewRoom(): void {
  gotoLobby();
  setupLobby();
}

function gotoLobby() {
  if (inLobby()) {
    return;
  }

  if (!shouldGoToLobby()) {
    return;
  }

  const game = Game();
  const level = game.GetLevel();
  const stageType = level.GetStageType();
  const effectiveStage = getEffectiveStage();

  // If we not already on the right floor, go there.
  if (
    effectiveStage !== STAGE_FOR_LOBBY ||
    stageType !== STAGE_TYPE_FOR_LOBBY
  ) {
    // Since we might be going to a new floor on frame 0, we have to specify that the PostNewLevel
    // callback should fire.
    forceNewLevelCallback();
    consoleCommand(`stage ${STAGE_ARGUMENT_FOR_LOBBY}`);
  }

  // Since we might be going to a new room on frame 0, we have to specify that the PostNewRoom
  // callback should fire.
  forceNewRoomCallback();
  consoleCommand(`goto d.${ROOM_VARIANT_FOR_LOBBY}`);
  // We will not actually be sent to the room until a frame passes, so wait until the next
  // PostNewRoom fires.
}

export function inLobby(): boolean {
  const roomGridIndex = getRoomGridIndex();
  const roomStageID = getRoomStageID();
  const roomVariant = getRoomVariant();

  return (
    roomGridIndex === asNumber(GridRoom.DEBUG) &&
    roomStageID === STAGE_ID_FOR_LOBBY &&
    roomVariant === ROOM_VARIANT_FOR_LOBBY
  );
}

function shouldGoToLobby() {
  return g.game !== null && !g.game.started;
}

function setupLobby() {
  if (!inLobby()) {
    return;
  }

  setupPlayerAndUI();
  disableMinimapAPI();

  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();

  const NPCs = getNPCs();
  removeEntities(NPCs);
  room.SetClear(true);

  removeAllDoors();

  for (const player of getPlayers()) {
    player.Position = centerPos;
  }

  spawnEntities();
}

function spawnEntities() {
  const gridIndexLeft = 93;
  spawnBox(gridIndexLeft, true);

  const gridIndexRight = 71;
  const boxRight = spawnBox(gridIndexRight, true);
  flipSprite(boxRight);

  const gridIndexTopLeft = 35;
  spawnBox(gridIndexTopLeft, false);
}

function flipSprite(entity: Entity) {
  const sprite = entity.GetSprite();
  sprite.FlipX = true;
}
