import { RoomDataToServer } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";

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
