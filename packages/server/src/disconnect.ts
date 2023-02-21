import { Game } from "./classes/Game.js";
import { Player } from "./classes/Player.js";
import { commandLeave } from "./commands/leave.js";
import { games } from "./games.js";
import { Socket } from "./interfaces/Socket.js";
import { logGameEvent } from "./log.js";
import { sendChat, sendNewGameDescription } from "./sendGame.js";

export function setPlayerAsDisconnectedInOngoingGames(userID?: number): void {
  if (userID === undefined) {
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

      setPlayerAsDisconnected(player, game);
      foundPlayer = true;
    }

    if (foundPlayer) {
      sendNewGameDescription(game);
    }
  }
}

function setPlayerAsDisconnected(player: Player, game: Game) {
  player.connected = false;
  player.socketID = -1;

  sendNewGameDescription(game);
  sendChat(game, "", `${player.username} disconnected.`);
  logGameEvent(game, `Player "${player.username}" disconnected.`);
}

export function leaveNonStartedGames(socket: Socket): void {
  const { userID } = socket;
  if (userID === undefined) {
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
