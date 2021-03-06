import { game, getEnumValues } from "isaacscript-common";
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
  const hud = game.GetHUD();
  hud.SetVisible(false);

  if (MinimapAPI !== undefined) {
    MinimapAPI.OverrideConfig.DisplayOnNoHUD = true;
  }
}

function removeAllItems(player: EntityPlayer) {
  removeActiveItems(player);
  player.AddCoins(-99);
  player.AddBombs(-99);
  player.AddKeys(-99);
  player.RemoveCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER);

  const trinket = player.GetTrinket(TrinketSlot.SLOT_1);
  if (trinket !== TrinketType.TRINKET_NULL) {
    player.TryRemoveTrinket(trinket);
  }
}

function removeActiveItems(player: EntityPlayer) {
  for (const activeSlot of getEnumValues(ActiveSlot)) {
    const activeItem = player.GetActiveItem(activeSlot);
    if (activeItem !== 0) {
      player.RemoveCollectible(activeItem);
    }
  }
}

function fullHeal(player: EntityPlayer) {
  player.AddHearts(24);
}
