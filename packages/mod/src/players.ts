import { UDPPositionInterface } from "./constants";
import g from "./globals";
import { PlayerData } from "./types/PlayerData";
import { GameDescriptionPlayer } from "./types/SocketCommands";
import { getRoomIndexModified } from "./utils";

export function getClosestAmongUsPlayer(): PlayerData | undefined {
  if (g.game === null) {
    error("Failed to get the closest player since the game was null.");
  }

  const player = Isaac.GetPlayer();
  const roomIndex = getRoomIndexModified();

  let closestPlayer: PlayerData | undefined;
  let closestDistance = math.huge;
  for (const otherPlayerData of g.game.playerMap.values()) {
    if (otherPlayerData.roomIndex !== roomIndex) {
      continue;
    }

    const otherPlayerDescription = g.game.getPlayerFromUserID(
      otherPlayerData.userID,
    );
    if (otherPlayerDescription === undefined || !otherPlayerDescription.alive) {
      continue;
    }

    const otherPlayerPosition = Vector(otherPlayerData.x, otherPlayerData.y);
    const distance = otherPlayerPosition.Distance(player.Position);
    if (distance < closestDistance) {
      closestPlayer = otherPlayerData;
      closestDistance = distance;
    }
  }

  return closestPlayer;
}

export function getOurPlayer(): GameDescriptionPlayer {
  if (g.game === null) {
    error("Failed to get our player since we are not in a game.");
  }

  if (g.userID === null) {
    error("Failed to get our player since our user ID is null.");
  }

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === undefined) {
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
  if (playerIndex === undefined) {
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
    renderFrameUpdated: isaacFrameCount,
  };
  g.game.playerMap.set(playerData.userID, playerData);
}
