import {
  removeAllMatchingEntities,
  removeItemFromItemTracker,
} from "isaacscript-common";
import g from "../globals";
import { KilledDataToMod } from "../types/SocketCommands";

export function commandKilled(data: KilledDataToMod): void {
  if (g.game === null) {
    return;
  }

  const killedPlayer = g.game.getPlayerFromUserID(data.userIDKilled);
  if (killedPlayer === null) {
    error(`Failed to find the player for user ID: ${data.userIDKilled}`);
  }
  killedPlayer.alive = false;

  if (killedPlayer.userID === g.userID) {
    const player = Isaac.GetPlayer();
    player.Velocity = Vector.Zero;
    player.ControlsEnabled = false;
    player.AddCollectible(CollectibleType.COLLECTIBLE_1UP);
    removeAllMatchingEntities(
      EntityType.ENTITY_FAMILIAR,
      FamiliarVariant.ONE_UP,
    );
    removeItemFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
    player.Kill();
  }
}
