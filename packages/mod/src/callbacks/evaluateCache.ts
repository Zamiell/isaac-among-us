import { IS_DEV, Task } from "common";
import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import g from "../globals";
import { mod } from "../mod";

export function init(): void {
  mod.AddCallback(ModCallback.EVALUATE_CACHE, speed, CacheFlag.SPEED);
}

function speed(player: EntityPlayer) {
  if (g.game === null) {
    return;
  }

  // Make the player move a bit slower to emulate the feel of the original Among Us.
  player.MoveSpeed = 0.75;

  // Make the player move faster for some specific tasks.
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
    player.MoveSpeed = 2;
  }
}
