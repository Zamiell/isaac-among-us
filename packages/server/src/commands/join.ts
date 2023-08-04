import type { JoinDataToServer } from "common";
import { MAX_PLAYERS, SocketCommandServerToMod } from "common";
import { Player } from "../classes/Player.js";
import { sendError } from "../error.js";
import { getLowestUnusedCharacter } from "../game.js";
import { games } from "../games.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { logGameEvent } from "../log.js";
import { sendNewGameDescription, sendPlayerJoined } from "../sendGame.js";
import { sendTCP } from "../sendTCP.js";
import { getTCPSocketByUserID } from "../tcpSockets.js";
import { validateInNoGames } from "../validate.js";

export function commandJoin(
  socket: Socket,
  data: JoinDataToServer,
  extraData: ExtraCommandData,
): void {
  const { userID } = socket;
  const { name, password, created } = data;
  const { game } = extraData;

  if (
    !validate(socket, name, password, extraData) ||
    userID === undefined ||
    game === undefined
  ) {
    return;
  }

  join(userID, game.id, created);
}

function validate(
  socket: Socket,
  name: string,
  password: string,
  extraData: ExtraCommandData,
): boolean {
  const { game, player } = extraData;

  if (game === undefined) {
    sendError(socket, `There is no game with the name of: ${name}`);
    return false;
  }

  if (game.password !== undefined && game.password !== password) {
    sendError(
      socket,
      `That is the incorrect password for game "${name}". Specify the connect password with: /join [name] [password]`,
    );
    return false;
  }

  if (game.started) {
    sendError(
      socket,
      `Game "${game.name}" has already started, so you cannot join it.`,
    );
    return false;
  }

  if (game.players.length > MAX_PLAYERS) {
    sendError(
      socket,
      `You cannot join a game that already has ${MAX_PLAYERS} in it.`,
    );
    return false;
  }

  if (player !== undefined) {
    sendError(socket, `You have already joined game: ${name}`);
    return false;
  }

  return validateInNoGames(socket, "join");
}

export function join(userID: number, gameID: number, created: boolean): void {
  const socket = getTCPSocketByUserID(userID);
  if (socket === undefined) {
    throw new Error(
      `Failed to join a game because there was no corresponding socket for user ID: ${userID}`,
    );
  }

  const game = games.get(gameID);
  if (game === undefined) {
    throw new Error(
      `Failed to join a game because there was no corresponding game for game ID: ${game}`,
    );
  }

  const { socketID, username } = socket;

  if (username === undefined) {
    return;
  }

  const index = game.players.length;
  const character = getLowestUnusedCharacter(game);
  const player = new Player(index, socketID, userID, username, character);
  game.players.push(player);

  const hasPassword = game.password !== undefined;
  sendTCP(socket, SocketCommandServerToMod.JOINED, {
    gameID: game.id,
    name: game.name,
    ownerUserID: game.ownerUserID,
    created,
    hasPassword,
    character,
    reconnected: false,
  });
  sendNewGameDescription(game);
  sendPlayerJoined(game, userID); // This has to be after the game description is sent.
  logGameEvent(
    game,
    `Player "${username}" joined; ${game.players.length} total players remaining.`,
  );
}
