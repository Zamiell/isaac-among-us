import type { CreateDataToServer } from "common";
import { Game } from "../classes/Game.js";
import { sendError } from "../error.js";
import { games, getNewGameID } from "../games.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { logGameEvent } from "../log.js";
import { sendAllNewGame } from "../sendAll.js";
import { getTCPSocketByUserID } from "../tcpSockets.js";
import { validateInNoGames } from "../validate.js";
import { join } from "./join.js";

export function commandCreate(
  socket: Socket,
  data: CreateDataToServer,
  extraData: ExtraCommandData,
): void {
  const { name, password } = data;
  const { userID, username } = socket;

  if (userID === undefined || username === undefined) {
    return;
  }

  if (!validate(socket, name, extraData)) {
    return;
  }

  create(userID, name, password);
}

function validate(socket: Socket, name: string, extraData: ExtraCommandData) {
  const { game } = extraData;

  if (game !== undefined) {
    sendError(
      socket,
      `There is already a game with the name of "${name}". Please choose a different name.`,
    );
    return false;
  }

  return validateInNoGames(socket, "create");
}

/** @returns The game ID of the new game. */
function create(
  userID: number,
  name: string,
  password: string | undefined,
): number | undefined {
  const socket = getTCPSocketByUserID(userID);
  if (socket === undefined) {
    throw new Error(
      `Failed to create a game because there was no corresponding socket for user ID: ${userID}`,
    );
  }

  const { username } = socket;

  if (username === undefined) {
    return undefined;
  }

  const gameID = getNewGameID();
  const passwordToUse = password === "" ? undefined : password;
  const game = new Game(gameID, name, passwordToUse, userID);
  games.set(gameID, game);

  join(userID, game.id, true);

  logGameEvent(game, "Created.");

  if (game.password === undefined) {
    sendAllNewGame(game, username);
  }

  return game.id;
}
