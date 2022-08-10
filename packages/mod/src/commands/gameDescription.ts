import { GameDescriptionDataToMod } from "common";
import { checkChangeOurCharacter } from "../callbacksCustom/postGameStartedReordered";
import * as autoLogin from "../features/autoLogin";
import g from "../globals";
import { getOurPlayer } from "../players";

export function commandGameDescription(data: GameDescriptionDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.players = data.players;
  g.game.started = data.started;
  g.game.meeting = data.meeting;

  const playerDescription = getOurPlayer();
  if (playerDescription === undefined) {
    error(
      'Failed to get our player description after receiving the "gameDescription" command.',
    );
  }

  g.game.character = playerDescription.character;
  g.game.usedEmergencyMeeting = playerDescription.usedEmergencyMeeting;

  checkChangeOurCharacter();

  autoLogin.onGameDescription();
}
