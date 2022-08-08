import { emptyArray } from "../array";
import { IS_DEV } from "../constants";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { NoData } from "../types/SocketCommands";

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
