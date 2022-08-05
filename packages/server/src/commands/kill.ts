import { error } from "../error";
import { getPlayer } from "../game";
import { sendKilled } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { PlayerBody } from "../types/PlayerBody";
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

  if (!validate(socket, data, extraData) || game === undefined) {
    return;
  }

  const playerKilled = getPlayer(userIDKilled, game);
  if (playerKilled === undefined) {
    return;
  }

  playerKilled.alive = false;
  const body: PlayerBody = {
    userID: userIDKilled,
    room,
    x,
    y,
  };
  game.bodies.push(body);

  sendKilled(game, userIDKilled, room, x, y);
}

function validate(
  socket: Socket,
  data: KillDataToServer,
  extraData: ExtraCommandData,
) {
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
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
  if (playerKilled === undefined) {
    error(socket, "That is an invalid player to kill.");
    return false;
  }

  return true;
}
