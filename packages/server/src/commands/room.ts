import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { RoomDataToServer } from "../types/SocketCommands";

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
