import { IS_DEV, MIN_PLAYERS } from "../constants";
import { error } from "../error";
import { assignImpostors } from "../imposters";
import { sendStarted } from "../sendGame";
import { assignTasks } from "../tasks";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { StartDataToServer } from "../types/SocketCommands";
import { validateGameOwner } from "../validate";

export function commandStart(
  socket: Socket,
  _data: StartDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, extraData) || game === null) {
    return;
  }

  game.started = true;
  assignImpostors(game);
  assignTasks(game);
  sendStarted(game);
}

function validate(socket: Socket, extraData: ExtraCommandData) {
  const { game } = extraData;

  if (game === null) {
    return false;
  }

  if (game.players.length < MIN_PLAYERS && !IS_DEV) {
    error(socket, `You need at least ${MIN_PLAYERS} to start a game.`);
    return false;
  }

  return validateGameOwner(socket, game, "start");
}
