import { ReconnectDataToMod, Role, SkeldRoom } from "common";
import { game } from "isaacscript-common";
import { AmongUsGame } from "../classes/AmongUsGame";
import {
  disableSendingEvents,
  enableSendingEvents,
} from "../features/sendGameEvents";
import { setupMeeting } from "../features/setupMeeting";
import g from "../globals";
import { loadMap } from "../loadMap";
import { enableMinimapAPI } from "../minimapAPI";
import { getSkeldRoomName } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { convertPlayerToGhostForm } from "./killed";

export function commandReconnect(data: ReconnectDataToMod): void {
  if (g.userID === null) {
    return;
  }

  g.game = new AmongUsGame(
    data.gameID,
    data.name,
    data.ownerUserID,
    data.character,
  );
  g.game.players = data.players;
  g.game.started = true;
  g.game.imposterUserIDs = data.imposterUserIDs;
  g.game.ourTasks = data.tasks;
  g.game.role = data.imposterUserIDs.length === 0 ? Role.CREW : Role.IMPOSTER;
  g.game.meeting = data.meeting;
  g.game.emergencyButtonOnCooldown = data.emergencyButtonOnCooldown;

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === undefined) {
    return;
  }
  g.game.usedEmergencyMeeting = player.usedEmergencyMeeting;
  g.game.bodies = data.bodies;

  disableSendingEvents();
  loadMap();
  enableMinimapAPI();

  if (g.game.meeting !== null) {
    setupMeeting(false);
    enableSendingEvents();
    return;
  }

  if (data.room !== SkeldRoom.CAFETERIA) {
    const roomName = getSkeldRoomName(data.room);
    goToStageAPIRoom(roomName);
  }

  setPlayerPosition(data.enterGridIndex);
  if (!player.alive) {
    convertPlayerToGhostForm();
  }
  enableSendingEvents();
}

function setPlayerPosition(gridIndex: int) {
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();

  player.Position = room.GetGridPosition(gridIndex);
}
