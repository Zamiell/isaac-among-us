import type { KillMeDataToServer } from "common";
import { IS_DEV } from "common";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { kill } from "./kill.js";

export function commandKillMe(
  _socket: Socket,
  data: KillMeDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (game === undefined) {
    return;
  }

  if (!IS_DEV) {
    return;
  }

  kill(game, data);
}
