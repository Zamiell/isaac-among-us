import { CreateDataToServer } from "common";
import { Game } from "../classes/Game";
import { error } from "../error";
import { games, getNewGameID } from "../games";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { logGameEvent } from "../log";
import { sendAllNewGame } from "../sendAll";
import { validateInNoGames } from "../validate";
import { commandJoin } from "./join";

export function commandCreate(
  socket: Socket,
  data: CreateDataToServer,
  extraData: ExtraCommandData,
): void {
  const { name, password } = data;
  const { username } = socket;

  if (username === undefined) {
    return;
  }

  if (!validate(socket, name, extraData)) {
    return;
  }

  create(socket, name, password);
}

function validate(socket: Socket, name: string, extraData: ExtraCommandData) {
  const { game } = extraData;

  if (game !== undefined) {
    error(
      socket,
      `There is already a game with the name of "${name}". Please choose a different name.`,
    );
    return false;
  }

  return validateInNoGames(socket, "create");
}

export function create(socket: Socket, name: string, password: string): void {
  const { username } = socket;

  if (username === undefined) {
    return;
  }

  const gameID = getNewGameID();
  const passwordToUse = password === "" ? null : password;
  const game = new Game(gameID, name, passwordToUse);
  games.set(gameID, game);

  commandJoin(
    socket,
    {
      name,
      password,
      created: true,
    },
    {
      game,
    },
  );

  logGameEvent(game, "Created.");

  if (game.password === null) {
    sendAllNewGame(game, username);
  }
}
