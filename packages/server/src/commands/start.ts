import {
  DEV_MIN_PLAYERS,
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const minPlayers = IS_DEV ? DEV_MIN_PLAYERS : MIN_PLAYERS;
  if (game.players.length < minPlayers) {
    error(socket, `You need at least ${minPlayers} players to start a game.`);
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
