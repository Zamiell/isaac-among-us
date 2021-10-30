import { getPlayers, setBlindfold } from "isaacscript-common";
import g from "./globals";

export function setupPlayerAndUI(): void {
  disableHUD();
  disableShooting();
  removeAllItems();
}

function disableHUD() {
  const hud = g.g.GetHUD();
  hud.SetVisible(false);

  if (MinimapAPI !== undefined) {
    MinimapAPI.OverrideConfig.DisplayOnNoHUD = true;
  }
}

function disableShooting() {
  for (const player of getPlayers()) {
    setBlindfold(player, true);
    player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD);
  }
}

function removeAllItems() {
  for (const player of getPlayers()) {
    player.AddCoins(-99);
    player.AddBombs(-99);
    player.AddKeys(-99);
  }
}
