import g from "./globals";
import { PlayerData } from "./types/PlayerData";
import { PlayerMessage } from "./types/PlayerMessage";
import { GameDescriptionPlayer } from "./types/SocketCommands";

export function getOurPlayer(
  players: GameDescriptionPlayer[],
): GameDescriptionPlayer {
  if (g.userID === null) {
    error("Failed to get our player since our user ID is null.");
  }

  return getPlayer(g.userID, players);
}

export function getPlayer(
  userID: int,
  players: GameDescriptionPlayer[],
): GameDescriptionPlayer {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.userID === userID) {
      return player;
    }
  }

  error(`Failed to get the player for user ID: ${userID}`);
  return players[0];
}

export function getPlayerCharacter(
  userID: int,
  players: GameDescriptionPlayer[],
): PlayerType {
  const player = getPlayer(userID, players);
  return player.character;
}

export function getPlayerUsername(
  userID: int,
  players: GameDescriptionPlayer[],
): string {
  const player = getPlayer(userID, players);
  return player.username;
}

export function updatePlayerMap(playerMessage: PlayerMessage): void {
  if (g.game === null) {
    return;
  }

  if (playerMessage.gameID !== g.game.id) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  const playerData: PlayerData = {
    userID: playerMessage.userID,
    x: playerMessage.x,
    y: playerMessage.y,
    roomIndex: playerMessage.roomIndex,
    animation: playerMessage.animation,
    animationFrame: playerMessage.animationFrame,
    overlayAnimation: playerMessage.overlayAnimation,
    overlayAnimationFrame: playerMessage.overlayAnimationFrame,
    frameUpdated: isaacFrameCount,
  };
  g.game.playerMap.set(playerData.userID, playerData);
}
