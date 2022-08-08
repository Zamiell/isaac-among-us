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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!IS_DEV) {
    return;
  }

  for (const player of game.players) {
    player.alive = true;
  }

  emptyArray(game.bodies);
}
