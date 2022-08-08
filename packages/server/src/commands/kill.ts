import { KillDataToServer, PlayerBody, Role } from "common";
import { Game } from "../classes/Game";
import { error } from "../error";
import { getPlayer } from "../game";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { sendKilled } from "../sendGame";

export function commandKill(
  socket: Socket,
  data: KillDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, data, extraData) || game === undefined) {
    return;
  }

  kill(game, data);
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

export function kill(game: Game, data: KillDataToServer): void {
  const { userIDKilled, room, x, y } = data;

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
