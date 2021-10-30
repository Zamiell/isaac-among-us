import { MAX_PLAYERS } from "../constants";
import { error } from "../error";
import { getLowestUnusedCharacter } from "../game";
import { logGameEvent } from "../log";
import { sendChat, sendNewGameDescription } from "../sendGame";
import { sendTCP } from "../sendTCP";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Player } from "../types/Player";
import { Socket } from "../types/Socket";
import {
  JoinDataToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";
import { validateInNoGames } from "../validate";

export function commandJoin(
  socket: Socket,
  data: JoinDataToServer,
  extraData: ExtraCommandData,
): void {
  const { socketID, userID, username } = socket;
  const { name, created } = data;
  const { game } = extraData;

  if (
    !validate(socket, name, extraData) ||
    game === null ||
    userID === null ||
    username === null
  ) {
    return;
  }

  const character = getLowestUnusedCharacter(game);
  const player = new Player(socketID, userID, username, character);
  game.players.push(player);

  sendTCP(socket, SocketCommandServerToMod.JOINED, {
    gameID: game.id,
    name: game.name,
    created,
    reconnected: false,
  });
  sendNewGameDescription(game);
  sendChat(game, "", `${username} joined the game.`);
  logGameEvent(
    game,
    `Player "${username}" joined; ${game.players.length} total players remaining.`,
  );
}

function validate(
  socket: Socket,
  name: string,
  extraData: ExtraCommandData,
): boolean {
  const { game, player } = extraData;

  if (game === null) {
    error(socket, `There is no game with the name of: ${name}`);
    return false;
  }

  if (game.started) {
    error(
      socket,
      `Game "${game.name}" has already started, so you cannot join it.`,
    );
    return false;
  }

  if (game.players.length > MAX_PLAYERS) {
    error(
      socket,
      `You cannot join a game that already has ${MAX_PLAYERS} in it.`,
    );
    return false;
  }

  if (player !== null) {
    error(socket, `You have already joined game: ${name}`);
    return false;
  }

  return validateInNoGames(socket, "join");
}
