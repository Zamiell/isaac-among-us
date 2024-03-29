import type { StartDataToServer } from "common";
import {
  DEV_MIN_PLAYERS,
  EMERGENCY_BUTTON_COOLDOWN_SECONDS,
  IS_DEV,
  MIN_PLAYERS,
} from "common";
import type { Game } from "../classes/Game.js";
import { sendError } from "../error.js";
import { doesGameIDExist } from "../games.js";
import { assignImpostors } from "../imposters.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { sendEmergencyButtonCooldown, sendStarted } from "../sendGame.js";
import { assignTasks } from "../tasks.js";
import { validateGameOwner } from "../validate.js";

export function commandStart(
  socket: Socket,
  _data: StartDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, extraData) || game === undefined) {
    return;
  }

  game.started = true;
  assignImpostors(game);
  assignTasks(game);
  sendStarted(game);
  setEmergencyButtonCooldown(game);
}

function validate(socket: Socket, extraData: ExtraCommandData) {
  const { game } = extraData;

  if (game === undefined) {
    return false;
  }

  const minPlayers = IS_DEV ? DEV_MIN_PLAYERS : MIN_PLAYERS;
  if (game.players.length < minPlayers) {
    sendError(
      socket,
      `You need at least ${minPlayers} players to start a game.`,
    );
    return false;
  }

  return validateGameOwner(socket, game, "start");
}

function setEmergencyButtonCooldown(game: Game) {
  game.emergencyButtonOnCooldown = true;
  const currentNight = game.night;
  setTimeout(() => {
    if (
      doesGameIDExist(game.id) &&
      game.started &&
      game.meeting === null &&
      game.night === currentNight
    ) {
      game.emergencyButtonOnCooldown = false;
      sendEmergencyButtonCooldown(game);
    }
  }, EMERGENCY_BUTTON_COOLDOWN_SECONDS * 1000);
}
