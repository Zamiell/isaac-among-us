import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { RoomDataToServer } from "../types/SocketCommands";

export function commandRoom(
  _socket: Socket,
  data: RoomDataToServer,
  extraData: ExtraCommandData,
): void {
  const { room, enterDoor } = data;
  const { player } = extraData;

  if (player === null) {
    return;
  }

  player.room = room;
  player.enterDoor = enterDoor;
}
