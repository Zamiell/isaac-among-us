import { games } from "../games";
import { sendTerminated } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { TerminateDataToServer } from "../types/SocketCommands";
import { validateGameOwner } from "../validate";

export function commandTerminate(
  socket: Socket,
  _data: TerminateDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, extraData) || game === undefined) {
    return;
  }

  sendTerminated(game);
  games.delete(game.id);
}

function validate(socket: Socket, extraData: ExtraCommandData) {
  const { game } = extraData;

  if (game === undefined) {
    return false;
  }

  return validateGameOwner(socket, game, "terminate");
}
