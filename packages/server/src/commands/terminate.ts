import type { TerminateDataToServer } from "common";
import { games } from "../games.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { sendTerminated } from "../sendGame.js";
import { validateGameOwner } from "../validate.js";

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
