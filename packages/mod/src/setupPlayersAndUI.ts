import { removeAllItems } from "./callbacksCustom/postGameStartedReordered";
import { disableShooting, updatePlayerStats } from "./utils";

export function setupPlayerAndUI(): void {
  const player = Isaac.GetPlayer();

  disableHUD();
  disableShooting();
  removeAllItems(player);
  fullHeal(player);
  updatePlayerStats();
}

function disableHUD() {
  if (MinimapAPI !== undefined) {
    MinimapAPI.OverrideConfig.DisplayOnNoHUD = true;
  }
}

function fullHeal(player: EntityPlayer) {
  player.AddHearts(24);
}
