import type { RoomDataToServer } from "common";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";

export function commandRoom(
  _socket: Socket,
  data: RoomDataToServer,
  extraData: ExtraCommandData,
): void {
  const { room, enterGridIndex } = data;
  const { player } = extraData;

  if (player === undefined) {
    return;
  }

  player.room = room;
  player.enterGridIndex = enterGridIndex;
}
