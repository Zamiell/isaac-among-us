import * as autoLogin from "../features/autoLogin";
import g from "../globals";
import { getOurPlayer } from "../players";
import { GameDescriptionDataToMod } from "../types/SocketCommands";

export function commandGameDescription(data: GameDescriptionDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.players = data.players;
  g.game.started = data.started;
  g.game.meeting = data.meeting;

  const player = getOurPlayer();
  g.game.usedEmergencyMeeting = player.usedEmergencyMeeting;

  autoLogin.onGameDescription();
}
