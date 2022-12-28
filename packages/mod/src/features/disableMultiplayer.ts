// Multiplayer is illegal in this mod, so if multiplayer is detected, the run is forcefully ended.

import { FadeoutTarget } from "isaac-typescript-definitions";
import { game, getPlayers, isChildPlayer } from "isaacscript-common";
import { mod } from "../mod";

const v = {
  run: {
    firstPlayerControllerIndex: null as int | null,
  },
};

export function init(): void {
  mod.saveDataManager("disableMultiplayer", v);
}

// ModCallback.POST_PLAYER_INIT (9)
export function postPlayerInit(player: EntityPlayer): void {
  if (v.run.firstPlayerControllerIndex === null) {
    v.run.firstPlayerControllerIndex = player.ControllerIndex;
  }
}

// ModCallback.POST_GAME_STARTED (15)
export function postGameStarted(): void {
  const controllerIndexes: int[] = [];
  for (const player of getPlayers()) {
    if (!controllerIndexes.includes(player.ControllerIndex)) {
      controllerIndexes.push(player.ControllerIndex);
    }
  }

  if (controllerIndexes.length > 1) {
    endRun();
  }
}

// ModCallback.PRE_GAME_EXIT (17)
export function preGameExit(shouldSave: boolean): void {
  if (!shouldSave) {
    v.run.firstPlayerControllerIndex = null;
  }
}

// ModCallbackCustom.POST_PLAYER_INIT_LATE
export function postPlayerInitLate(player: EntityPlayer): void {
  if (isChildPlayer(player)) {
    return;
  }

  if (player.ControllerIndex !== v.run.firstPlayerControllerIndex) {
    endRun();
  }
}

function endRun() {
  // A new player has arrived that is not the first player, so they must be trying to initiate a
  // multiplayer game.
  game.Fadeout(0.05, FadeoutTarget.TITLE_SCREEN);
}
