import type { NoData } from "common";
import { IS_DEV } from "common";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { emptyArray } from "../isaacScriptCommonTS.js";

export function commandRevive(
  _socket: Socket,
  _data: NoData,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (game === undefined) {
    return;
  }

  if (!IS_DEV) {
    return;
  }

  for (const player of game.players) {
    player.alive = true;
  }

  emptyArray(game.bodies);
}
