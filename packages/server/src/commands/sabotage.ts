import { Role, SabotageDataToServer } from "common";
import { Game } from "../classes/Game";
import { sendError } from "../error";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { sendSabotage } from "../sendGame";

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

export function sabotage(game: Game, data: SabotageDataToServer): void {
  // TODO: logic for no multiple sabotages
  sendSabotage(game, data.sabotageType);
}
