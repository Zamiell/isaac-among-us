import { UDPPositionInterface } from "./constants";
import g from "./globals";
import { PlayerData } from "./types/PlayerData";
import { GameDescriptionPlayer } from "./types/SocketCommands";

export function getOurPlayer(): GameDescriptionPlayer {
  if (g.game === null) {
    error("Failed to get our player since we are not in a game.");
  }

  if (g.userID === null) {
    error("Failed to get our player since our user ID is null.");
  }

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === null) {
    error(`Failed to find a player with our user ID: ${g.userID}`);
  }

  return player;
}

export function getOurPlayerIndex(): int {
  if (g.game === null) {
    error("Failed to get our player since we are not in a game.");
  }

  if (g.userID === null) {
    error("Failed to get our player since our user ID is null.");
  }

  const playerIndex = g.game.getPlayerIndexFromUserID(g.userID);
  if (playerIndex === null) {
    error(`Failed to find a player index with our user ID: ${g.userID}`);
  }

  return playerIndex;
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
    roomIndex: playerPositionMessage.roomIndex,
    animation: playerPositionMessage.animation,
    animationFrame: playerPositionMessage.animationFrame,
    overlayAnimation: playerPositionMessage.overlayAnimation,
    overlayAnimationFrame: playerPositionMessage.overlayAnimationFrame,
    frameUpdated: isaacFrameCount,
  };
  g.game.playerMap.set(playerData.userID, playerData);
}
