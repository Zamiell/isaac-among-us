import { IS_DEV, KillMeDataToServer } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";
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
