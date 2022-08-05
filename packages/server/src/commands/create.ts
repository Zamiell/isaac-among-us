import { error } from "../error";
import { games, getNewGameID } from "../games";
import { logGameEvent } from "../log";
import { sendAllNewGame } from "../sendAll";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { Socket } from "../types/Socket";
import { CreateDataToServer } from "../types/SocketCommands";
import { validateInNoGames } from "../validate";
import { commandJoin } from "./join";

export function commandCreate(
  socket: Socket,
  data: CreateDataToServer,
  extraData: ExtraCommandData,
): void {
  const { name } = data;
  const { username } = socket;

  if (username === undefined) {
    return;
  }

  if (!validate(socket, name, extraData)) {
    return;
  }

  const gameID = getNewGameID();
  const game = new Game(gameID, name);
  games.set(gameID, game);

  commandJoin(
    socket,
    {
      name: data.name,
      created: true,
    },
    {
      game,
    },
  );

  logGameEvent(game, "Created.");
  sendAllNewGame(game, username);
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
