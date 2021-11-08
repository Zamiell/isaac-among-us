import g from "../globals";
import { sendTCP } from "../network/send";
import { skeldRoomMap } from "../skeldRoomMap";
import { getStageAPIRoomName } from "../stageAPISubroutines";
import { SkeldRoom } from "../types/SkeldRoom";
import { SocketCommandModToServer } from "../types/SocketCommands";

let sendEvents = true;

export function postRoomLoad(): void {
  sendRoom();
}

export function sendRoom(): void {
  if (
    StageAPI === undefined ||
    g.game === null ||
    !g.game.started ||
    !sendEvents
  ) {
    return;
  }

  const game = Game();
  const roomName = getStageAPIRoomName();
  const skeldRoom = skeldRoomMap.get(roomName);
  if (skeldRoom === undefined || skeldRoom === SkeldRoom.TASK) {
    return;
  }

  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const gridIndex = room.GetClampedGridIndex(player.Position);

  sendTCP(SocketCommandModToServer.ROOM, {
    gameID: g.game.id,
    room: skeldRoom,
    enterGridIndex: gridIndex,
  });
}

export function enableSendingEvents(): void {
  sendEvents = true;
}

export function disableSendingEvents(): void {
  sendEvents = false;
}
