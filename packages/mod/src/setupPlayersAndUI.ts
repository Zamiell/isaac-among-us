import { getEnumValues } from "isaacscript-common";
import { disableShooting } from "./util";

export function setupPlayerAndUI(): void {
  const player = Isaac.GetPlayer();

  disableHUD();
  disableShooting();
  removeAllItems(player);
  setStats(player);
  fullHeal(player);
}

function disableHUD() {
  const game = Game();
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
  player.TryRemoveTrinket(TrinketType.TRINKET_PETRIFIED_POOP);
  player.RemoveCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER);
}

function removeActiveItems(player: EntityPlayer) {
  for (const activeSlot of getEnumValues(ActiveSlot)) {
    const activeItem = player.GetActiveItem(activeSlot);
    if (activeItem !== 0) {
      player.RemoveCollectible(activeItem);
    }
  }
}

function setStats(player: EntityPlayer) {
  player.AddCacheFlags(CacheFlag.CACHE_ALL);
  player.EvaluateItems();
}

function fullHeal(player: EntityPlayer) {
  player.AddHearts(24);
}
