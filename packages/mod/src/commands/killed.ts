import {
  removeAllMatchingEntities,
  removeCollectibleFromItemTracker,
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
    weGotKilled();
  }
}

function weGotKilled() {
  const player = Isaac.GetPlayer();
  player.Velocity = Vector.Zero;
  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP);
  removeAllMatchingEntities(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
  player.Kill();
}
