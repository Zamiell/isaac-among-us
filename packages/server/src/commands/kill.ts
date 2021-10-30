import { error } from "../error";
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
  const { game, player } = extraData;
  const { userIDKilled, room, x, y } = data;

  if (!validate(socket, extraData) || game === null || player === null) {
    return;
  }

  player.alive = false;
  player.body = {
    room,
    x,
    y,
  };
  game.playersKilledSinceLastMeeting.push(player.userID);

  sendKilled(game, userIDKilled, room, x, y);
}

function validate(socket: Socket, extraData: ExtraCommandData) {
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

  return true;
}
