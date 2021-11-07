import { enableSendingEvents } from "../features/sendGameEvents";
import { setupMeeting } from "../features/setupMeeting";
import g from "../globals";
import { loadMap } from "../loadMap";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { fixRoomEntrancePosition, goToStageAPIRoom } from "../stageAPI";
import { AmongUsGame } from "../types/AmongUsGame";
import { Role } from "../types/Role";
import { SkeldRoom } from "../types/SkeldRoom";
import { ReconnectDataToMod } from "../types/SocketCommands";

export function commandReconnect(data: ReconnectDataToMod): void {
  if (g.userID === null) {
    return;
  }

  const game = Game();
  const level = game.GetLevel();

  g.game = new AmongUsGame(data.gameID, data.name);
  g.game.players = data.players;
  g.game.started = true;
  g.game.imposters = data.imposters;
  g.game.ourTasks = data.tasks;
  g.game.role = data.imposters === null ? Role.CREW : Role.IMPOSTER;
  g.game.meeting = data.meeting;

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === null) {
    return;
  }
  g.game.usedEmergencyMeeting = player.usedEmergencyMeeting;

  enableSendingEvents(false);
  loadMap();

  if (g.game.meeting !== null) {
    setupMeeting(false);
    enableSendingEvents(true);
    return;
  }

  if (data.room === SkeldRoom.CAFETERIA) {
    level.EnterDoor = data.enterDoor;
    fixRoomEntrancePosition();
  } else {
    const roomName = skeldRoomReverseMap[data.room];
    if (roomName === undefined) {
      error(`Failed to get the room name for room: ${data.room}`);
    }
    goToStageAPIRoom(roomName, data.enterDoor);
  }
  enableSendingEvents(true);
}
