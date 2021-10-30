// Position data for players is sent using UDP due to the heavy bandwidth usage
// All other traffic is sent using TCP

import { getRoomIndex } from "isaacscript-common";
import {
  LOBBY_ROOM_INDEX,
  UDP_BEACON_DATA_FORMAT,
  UDP_BEACON_FIELDS,
  UDP_BEACON_INTERVAL,
  UDP_BEACON_MESSAGE,
  UDP_POSITION_DATA_FORMAT,
  UDP_POSITION_FIELDS,
} from "../constants";
import g from "../globals";
import { PlayerMessage } from "../types/PlayerMessage";
import { sendUDP } from "./send";
import * as struct from "./struct";

let lastBeaconFrame: int | null = null;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null) {
    return;
  }

  sendBeacon();
  sendPosition();
}

function sendBeacon() {
  if (g.game === null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  if (
    lastBeaconFrame !== null &&
    isaacFrameCount < lastBeaconFrame + UDP_BEACON_INTERVAL
  ) {
    return;
  }
  lastBeaconFrame = isaacFrameCount;

  const structObject = {
    gameID: g.game.id,
    userID: g.userID,
    message: UDP_BEACON_MESSAGE,
  };

  const structData: unknown[] = [];
  for (const field of UDP_BEACON_FIELDS) {
    const key = field as keyof typeof structObject;
    const fieldData = structObject[key];
    structData.push(fieldData);
  }

  const packedData = struct.pack(UDP_BEACON_DATA_FORMAT, structData);
  sendUDP(packedData);
}

function sendPosition() {
  if (g.game === null || g.userID === null || g.username === null) {
    return;
  }

  const player = Isaac.GetPlayer();
  const sprite = player.GetSprite();
  const animation = sprite.GetAnimation();
  const animationFrame = sprite.GetFrame();
  let overlayAnimation = sprite.GetOverlayAnimation();
  if (sprite.IsOverlayPlaying(overlayAnimation)) {
    overlayAnimation = "";
  }
  const overlayAnimationFrame = sprite.GetOverlayFrame();
  let roomIndex = getRoomIndex();
  if (roomIndex === GridRooms.ROOM_DEBUG_IDX) {
    roomIndex = LOBBY_ROOM_INDEX;
  }

  const structObject: PlayerMessage = {
    gameID: g.game.id,
    userID: g.userID,
    x: player.Position.X,
    y: player.Position.Y,
    roomIndex,
    animation,
    animationFrame,
    overlayAnimation,
    overlayAnimationFrame,
  };

  const structData: unknown[] = [];
  for (const field of UDP_POSITION_FIELDS) {
    const key = field as keyof typeof structObject;
    const fieldData = structObject[key];
    structData.push(fieldData);
  }

  const packedData = struct.pack(
    UDP_POSITION_DATA_FORMAT,
    table.unpack(structData),
  );
  sendUDP(packedData);
}
