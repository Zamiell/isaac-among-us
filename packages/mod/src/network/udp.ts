// Position data for players is sent using UDP due to the heavy bandwidth usage. All other traffic
// is sent using TCP.

import {
  UDPBeaconInterface,
  UDPPositionInterface,
  UDP_BEACON_DATA_FORMAT,
  UDP_BEACON_FIELDS,
  UDP_BEACON_INTERVAL,
  UDP_BEACON_MESSAGE,
  UDP_POSITION_DATA_FORMAT,
  UDP_POSITION_FIELDS,
} from "../constants";
import g from "../globals";
import { getRoomIndexModified } from "../utils";
import { sendUDP } from "./send";
import * as struct from "./struct";

let lastBeaconRenderFrame: int | null = null;

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null) {
    return;
  }

  sendBeacon();
  sendPosition();
}

function sendBeacon() {
  if (g.game === null || g.userID === null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  if (
    lastBeaconRenderFrame !== null &&
    isaacFrameCount < lastBeaconRenderFrame + UDP_BEACON_INTERVAL
  ) {
    return;
  }
  lastBeaconRenderFrame = isaacFrameCount;

  const structObject: UDPBeaconInterface = {
    gameID: g.game.id,
    userID: g.userID,
    message: UDP_BEACON_MESSAGE,
  };

  const structData: unknown[] = [];
  for (const [fieldName] of UDP_BEACON_FIELDS) {
    const fieldData = structObject[fieldName];
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
  const roomIndex = getRoomIndexModified();

  const structObject: UDPPositionInterface = {
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
  for (const [fieldName] of UDP_POSITION_FIELDS) {
    const fieldData = structObject[fieldName];
    structData.push(fieldData);
  }

  const packedData = struct.pack(
    UDP_POSITION_DATA_FORMAT,
    table.unpack(structData),
  );
  sendUDP(packedData);
}
