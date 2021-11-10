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

  const playerDescription = getOurPlayer();
  g.game.usedEmergencyMeeting = playerDescription.usedEmergencyMeeting;

  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();
  const correctCharacter = playerDescription.character;
  if (character !== correctCharacter) {
    player.ChangePlayerType(correctCharacter);
  }

  autoLogin.onGameDescription();
}
