import { log } from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";
import * as errors from "../features/errors";
import * as goToEmptyRoom from "../features/goToEmptyRoom";
import * as restartOnNextFrame from "../features/restartOnNextFrame";
import g from "../globals";
import { getOurPlayer } from "../players";

export function main(isContinued: boolean): void {
  const game = Game();
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();
  const isaacFrameCount = Isaac.GetFrameCount();

  log(
    `MC_POST_GAME_STARTED - Seed: ${startSeedString} - IsaacFrame: ${isaacFrameCount} - Continued: ${isContinued}`,
  );

  // Check for errors that should prevent the mod from doing anything
  if (errors.check()) {
    return;
  }

  if (restartOnNextFrame.postGameStarted()) {
    return;
  }

  disableMultiplayer.postGameStarted();
  goToEmptyRoom.postGameStarted();
  changeToOurCharacter();
}

function changeToOurCharacter() {
  if (g.game === null) {
    return;
  }

  const player = Isaac.GetPlayer();
  const playerDescription = getOurPlayer();
  const character = player.GetPlayerType();
  const correctCharacter = playerDescription.character;
  if (character !== correctCharacter) {
    player.ChangePlayerType(correctCharacter);
  }
}
