import { IS_DEV } from "../constants";
import g from "../globals";

export function main(player: EntityPlayer, cacheFlag: CacheFlag): void {
  if (g.game === null) {
    return;
  }

  // Make the player move a bit slower to emulate the feel of the original Among Us
  if (cacheFlag === CacheFlag.CACHE_SPEED) {
    player.MoveSpeed -= 0.2;
  }

  if (IS_DEV) {
    player.MoveSpeed = 2;
  }
}
