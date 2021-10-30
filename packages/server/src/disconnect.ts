import { commandLeave } from "./commands/leave";
import { games } from "./games";
import { logGameEvent } from "./log";
import { sendChat, sendNewGameDescription } from "./sendGame";
import { Game } from "./types/Game";
import { Player } from "./types/Player";
import { Socket } from "./types/Socket";

export function setPlayerAsDisconnectedInOngoingGames(
  userID: number | null,
): void {
  if (userID === null) {
    return;
  }

  for (const game of games.values()) {
    if (!game.started) {
      continue;
    }

    let foundPlayer = false;
    for (const player of game.players) {
      if (player.userID !== userID) {
        continue;
      }

      disconnect(player, game);
      foundPlayer = true;
    }

    if (foundPlayer) {
      sendNewGameDescription(game);
    }
  }
}

function disconnect(player: Player, game: Game) {
  player.connected = false;
  player.socketID = -1;

  sendNewGameDescription(game);
  sendChat(game, "", `${player.username} reconnected to the game.`);
  logGameEvent(game, `Player "${player.username}" disconnected.`);
}

export function leaveNonStartedGames(socket: Socket): void {
  const { userID } = socket;
  if (userID === null) {
    return;
  }

  for (const game of games.values()) {
    if (game.started) {
      continue;
    }

    for (const player of game.players) {
      if (player.userID !== userID) {
        continue;
      }

      commandLeave(
        socket,
        {
          gameID: game.id,
        },
        {
          game,
          player,
        },
      );
    }
  }
}
