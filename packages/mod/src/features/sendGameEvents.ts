import { SkeldRoom, SocketCommandModToServer } from "common";
import { game } from "isaacscript-common";
import { g } from "../globals";
import { sendTCP } from "../network/send";
import { getSkeldRoomFromName } from "../skeldRoomMap";
import { getStageAPIRoomName } from "../stageAPISubroutines";

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

  const roomName = getStageAPIRoomName();
  if (roomName === undefined) {
    return;
  }

  const skeldRoom = getSkeldRoomFromName(roomName);
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
