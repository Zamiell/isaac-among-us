import { log } from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";
import * as errors from "../features/errors";
import * as restartOnNextFrame from "../features/restartOnNextFrame";
import * as welcomeNotification from "../features/welcomeNotification";
import { enableMinimapAPI } from "../util";

export function main(isContinued: boolean): void {
  const game = Game();
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();
  const isaacFrameCount = Isaac.GetFrameCount();

  log(
    `MC_POST_GAME_STARTED - Seed: ${startSeedString} - IsaacFrame: ${isaacFrameCount} - Continued: ${isContinued}`,
  );

  // MinimapAPI may have been disabled in a previous run
  enableMinimapAPI(true);

  // Check for errors that should prevent the mod from doing anything
  if (errors.check()) {
    return;
  }

  disableMultiplayer.postGameStarted();
  restartOnNextFrame.postGameStarted();
  welcomeNotification.postGameStarted();
}
