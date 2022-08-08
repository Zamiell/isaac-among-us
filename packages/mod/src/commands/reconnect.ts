import { game } from "isaacscript-common";
import { AmongUsGame } from "../classes/AmongUsGame";
import { Role } from "../enums/Role";
import { SkeldRoom } from "../enums/SkeldRoom";
import {
  disableSendingEvents,
  enableSendingEvents,
} from "../features/sendGameEvents";
import { setupMeeting } from "../features/setupMeeting";
import g from "../globals";
import { loadMap } from "../loadMap";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { ReconnectDataToMod } from "../types/SocketCommands";

export function commandReconnect(data: ReconnectDataToMod): void {
  if (g.userID === null) {
    return;
  }

  g.game = new AmongUsGame(data.gameID, data.name, data.character);
  g.game.players = data.players;
  g.game.started = true;
  g.game.imposters = data.imposters;
  g.game.ourTasks = data.tasks;
  g.game.role = data.imposters === null ? Role.CREW : Role.IMPOSTER;
  g.game.meeting = data.meeting;

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === undefined) {
    return;
  }
  g.game.usedEmergencyMeeting = player.usedEmergencyMeeting;
  g.game.bodies = data.bodies;

  disableSendingEvents();
  loadMap();

  if (g.game.meeting !== null) {
    setupMeeting(false);
    enableSendingEvents();
    return;
  }

  if (data.room !== SkeldRoom.CAFETERIA) {
    const roomName = skeldRoomReverseMap[data.room];
    if (roomName === undefined) {
      error(`Failed to get the room name for room: ${data.room}`);
    }
    goToStageAPIRoom(roomName);
  }

  setPlayerPosition(data.enterGridIndex);
  enableSendingEvents();
}

function setPlayerPosition(gridIndex: int) {
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();

  player.Position = room.GetGridPosition(gridIndex);
}
