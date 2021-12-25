import { error } from "../error";
import { getPlayer } from "../game";
import { sendKilled } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Role } from "../types/Role";
import { Socket } from "../types/Socket";
import { KillDataToServer } from "../types/SocketCommands";

export function commandKill(
  socket: Socket,
  data: KillDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;
  const { userIDKilled, room, x, y } = data;

  if (!validate(socket, data, extraData) || game === null) {
    return;
  }

  const playerKilled = getPlayer(userIDKilled, game);
  if (playerKilled === null) {
    return;
  }

  playerKilled.alive = false;
  playerKilled.body = {
    room,
    x,
    y,
  };
  game.playersKilledSinceLastMeeting.push(userIDKilled);

  sendKilled(game, userIDKilled, room, x, y);
}

function validate(
  socket: Socket,
  data: KillDataToServer,
  extraData: ExtraCommandData,
) {
  const { game, player } = extraData;

  if (game === null || player === null) {
    return false;
  }

  if (game.meeting !== null) {
    error(socket, "You cannot send that command while a meeting is going.");
    return false;
  }

  if (player.role !== Role.IMPOSTER) {
    error(socket, "You can only send that command as an impostor.");
    return false;
  }

  const { userIDKilled } = data;
  const playerKilled = getPlayer(userIDKilled, game);
  if (playerKilled === null) {
    error(socket, "That is an invalid player to kill.");
    return false;
  }

  return true;
}
