import type { SabotageDataToServer } from "common";
import { Role } from "common";
import type { Game } from "../classes/Game.js";
import { sendError } from "../error.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { sendSabotage } from "../sendGame.js";

export function commandSabotage(
  socket: Socket,
  data: SabotageDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, data, extraData) || game === undefined) {
    return;
  }

  sabotage(game, data);
}

function validate(
  socket: Socket,
  _data: SabotageDataToServer,
  extraData: ExtraCommandData,
) {
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
    return false;
  }

  if (game.meeting !== null) {
    sendError(socket, "You cannot send that command while a meeting is going.");
    return false;
  }

  if (player.role !== Role.IMPOSTER) {
    sendError(socket, "You can only send that command as an impostor.");
    return false;
  }

  return true;
}

function sabotage(game: Game, data: SabotageDataToServer) {
  // TODO: logic for no multiple sabotages
  sendSabotage(game, data.sabotageType);
}
