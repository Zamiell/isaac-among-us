import { IS_DEV } from "../constants";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { KillMeDataToServer } from "../types/SocketCommands";
import { kill } from "./kill";

export function commandKillMe(
  _socket: Socket,
  data: KillMeDataToServer,
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

  kill(game, data);
}
