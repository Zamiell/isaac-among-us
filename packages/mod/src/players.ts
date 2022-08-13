// Many player methods are located on the `AmongUsGame` class.

import { GameDescriptionPlayer } from "common";
import g from "./globals";
import { PlayerData } from "./interfaces/PlayerData";
import { UDPPositionInterface } from "./network/udpData";

export function getOurPlayer(): GameDescriptionPlayer | undefined {
  if (g.game === null) {
    return undefined;
  }

  if (g.userID === null) {
    return undefined;
  }

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === undefined) {
    return undefined;
  }

  return player;
}

export function getOurPlayerIndex(): int | undefined {
  const ourPlayer = getOurPlayer();
  return ourPlayer === undefined ? undefined : ourPlayer.index;
}

export function updatePlayerMap(
  playerPositionMessage: UDPPositionInterface,
): void {
  if (g.game === null) {
    return;
  }

  if (playerPositionMessage.gameID !== g.game.id) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  const playerData: PlayerData = {
    userID: playerPositionMessage.userID,
    x: playerPositionMessage.x,
    y: playerPositionMessage.y,
    room: playerPositionMessage.room,
    animation: playerPositionMessage.animation,
    animationFrame: playerPositionMessage.animationFrame,
    overlayAnimation: playerPositionMessage.overlayAnimation,
    overlayAnimationFrame: playerPositionMessage.overlayAnimationFrame,
    renderFrameUpdated: isaacFrameCount,
  };
  g.game.playerMap.set(playerData.userID, playerData);
}
