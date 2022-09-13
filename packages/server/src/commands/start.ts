import {
  DEV_MIN_PLAYERS,
  EMERGENCY_BUTTON_COOLDOWN_SECONDS,
  IS_DEV,
  MIN_PLAYERS,
  StartDataToServer,
} from "common";
import { Game } from "../classes/Game";
import { sendError } from "../error";
import { doesGameIDExist } from "../games";
import { assignImpostors } from "../imposters";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { sendEmergencyButtonCooldown, sendStarted } from "../sendGame";
import { assignTasks } from "../tasks";
import { validateGameOwner } from "../validate";

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
