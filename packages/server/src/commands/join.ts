import {
  JoinDataToServer,
  MAX_PLAYERS,
  SocketCommandServerToMod,
} from "common";
import { Game } from "../classes/Game";
import { Player } from "../classes/Player";
import { error } from "../error";
import { getLowestUnusedCharacter } from "../game";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { logGameEvent } from "../log";
import { sendChat, sendNewGameDescription } from "../sendGame";
import { sendTCP } from "../sendTCP";
import { validateInNoGames } from "../validate";

export function commandJoin(
  socket: Socket,
  data: JoinDataToServer,
  extraData: ExtraCommandData,
): void {
  const { name, created } = data;
  const { game } = extraData;

  if (!validate(socket, name, extraData) || game === undefined) {
    return;
  }

  join(socket, game, created);
}

function validate(
  socket: Socket,
  name: string,
  extraData: ExtraCommandData,
): boolean {
  const { game, player } = extraData;

  if (game === undefined) {
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

  if (player !== undefined) {
    error(socket, `You have already joined game: ${name}`);
    return false;
  }

  return validateInNoGames(socket, "join");
}

export function join(socket: Socket, game: Game, created: boolean): void {
  const { socketID, userID, username } = socket;

  if (userID === undefined || username === undefined) {
    return;
  }

  const index = game.players.length;
  const character = getLowestUnusedCharacter(game);
  const player = new Player(index, socketID, userID, username, character);
  game.players.push(player);

  sendTCP(socket, SocketCommandServerToMod.JOINED, {
    gameID: game.id,
    name: game.name,
    created,
    character,
    reconnected: false,
  });
  sendNewGameDescription(game);
  sendChat(game, "", `${username} joined the game.`);
  logGameEvent(
    game,
    `Player "${username}" joined; ${game.players.length} total players remaining.`,
  );
}
