import { IS_DEV, NoData } from "common";
import { emptyArray } from "../array";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";

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
