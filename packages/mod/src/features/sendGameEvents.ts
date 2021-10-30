import g from "../globals";
import { sendTCP } from "../network/send";
import { skeldRoomMap } from "../skeldRoomMap";
import { getStageAPIRoomName } from "../stageAPI";
import { SocketCommandModToServer } from "../types/SocketCommands";

let sendEvents = true;

export function postRoomLoad(): void {
  if (
    StageAPI === undefined ||
    g.game === null ||
    !g.game.started ||
    !sendEvents
  ) {
    return;
  }

  const level = g.g.GetLevel();
  const roomName = getStageAPIRoomName();
  const room = skeldRoomMap.get(roomName);
  if (room === undefined) {
    return;
  }

  sendTCP(SocketCommandModToServer.ROOM, {
    gameID: g.game.id,
    room,
    enterDoor: level.EnterDoor,
  });
}

export function enableSendingEvents(enable: boolean): void {
  sendEvents = enable;
}
