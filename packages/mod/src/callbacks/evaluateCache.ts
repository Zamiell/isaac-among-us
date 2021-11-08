import { IS_DEV } from "../constants";
import g from "../globals";
import { Task } from "../types/Task";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, speed, CacheFlag.CACHE_SPEED);
}

export function speed(player: EntityPlayer): void {
  if (g.game === null) {
    return;
  }

  // Make the player move a bit slower to emulate the feel of the original Among Us
  player.MoveSpeed = 0.75;

  // Make the player move faster for some specific tasks
  if (
    g.game.currentTask === Task.SHORT_FIX_WIRES ||
    g.game.currentTask === Task.LONG_MAKE_PENTAGRAM
  ) {
    player.MoveSpeed = 2;
  }

  if (g.game.currentTask === Task.LONG_DODGE_STONE_SHOOTERS) {
    player.MoveSpeed = 1;
  }

  if (IS_DEV) {
    // player.MoveSpeed = 2;
  }
}
