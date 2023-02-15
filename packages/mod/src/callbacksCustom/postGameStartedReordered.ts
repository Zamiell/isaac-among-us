import { CollectibleType, PlayerType } from "isaac-typescript-definitions";
import {
  game,
  log,
  ModCallbackCustom,
  removeAllActiveItems,
  removeAllPlayerTrinkets,
} from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";
import * as errors from "../features/errors";
import * as goToEmptyRoom from "../features/goToEmptyRoom";
import * as restartOnNextFrame from "../features/restartOnNextFrame";
import { g } from "../globals";
import { mod } from "../mod";
import { disableShooting } from "../utils";

export function init(): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_GAME_STARTED_REORDERED, main);
}

function main(isContinued: boolean) {
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();
  const renderFrameCount = Isaac.GetFrameCount();

  log(
    `MC_POST_GAME_STARTED - startSeedString: ${startSeedString} - renderFrameCount: ${renderFrameCount} - isContinued: ${isContinued}`,
  );

  // Check for errors that should prevent the mod from doing anything.
  if (errors.postGameStarted()) {
    return;
  }

  if (restartOnNextFrame.postGameStarted()) {
    return;
  }

  const player = Isaac.GetPlayer();

  disableHUD();
  disableShooting();
  removeAllItems(player);

  disableMultiplayer.postGameStarted();
  goToEmptyRoom.postGameStarted();
  checkChangeOurCharacter();
}

function disableHUD() {
  const hud = game.GetHUD();
  hud.SetVisible(false);
}

export function removeAllItems(player: EntityPlayer): void {
  removeAllActiveItems(player);
  removeAllPlayerTrinkets(player);
  player.AddCoins(-999);
  player.AddBombs(-999);
  player.AddKeys(-999);
  player.RemoveCollectible(CollectibleType.BLACK_POWDER);
}

export function checkChangeOurCharacter(): void {
  if (g.game === null) {
    return;
  }

  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();
  const correctCharacter = g.game.character as unknown as PlayerType;

  if (character !== correctCharacter) {
    player.ChangePlayerType(correctCharacter);
  }
}
