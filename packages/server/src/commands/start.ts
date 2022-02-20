import {
  EMERGENCY_BUTTON_COOLDOWN_SECONDS,
  IS_DEV,
  MIN_PLAYERS,
} from "../constants";
import { error } from "../error";
import { assignImpostors } from "../imposters";
import { sendEmergencyButtonCooldown, sendStarted } from "../sendGame";
import { assignTasks } from "../tasks";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { Socket } from "../types/Socket";
import { StartDataToServer } from "../types/SocketCommands";
import { validateGameOwner } from "../validate";

export function commandStart(
  socket: Socket,
  _data: StartDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (!validate(socket, extraData) || game === null) {
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

  if (game === null) {
    return false;
  }

  if (game.players.length < MIN_PLAYERS && !IS_DEV) {
    error(socket, `You need at least ${MIN_PLAYERS} to start a game.`);
    return false;
  }

  return validateGameOwner(socket, game, "start");
}

function setEmergencyButtonCooldown(game: Game) {
  game.emergencyButtonCooldown = true;
  const currentNight = game.night;
  setTimeout(() => {
    if (game.meeting !== null || game.night !== currentNight) {
      return;
    }

    game.emergencyButtonCooldown = false;
    sendEmergencyButtonCooldown(game);
  }, EMERGENCY_BUTTON_COOLDOWN_SECONDS * 1000);
}
