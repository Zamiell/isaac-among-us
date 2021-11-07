import {
  arrayRemoveInPlace,
  getNPCs,
  removeAllMatchingEntities,
} from "isaacscript-common";
import { taskDescriptions } from "../constants";
import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { sendTCP } from "../network/send";
import { setupPlayerAndUI } from "../setupPlayersAndUI";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { SocketCommandModToServer } from "../types/SocketCommands";
import { movePlayerToGridIndex, removeGridEntity } from "../util";
import { isWallGridIndex } from "../wall";

const sfx = SFXManager();

export function taskComplete(): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const task = g.game.currentTask;

  sfx.Stop(SoundEffect.SOUND_THUMBSUP);
  sfx.Play(SoundEffect.SOUND_1UP);

  sendTCP(SocketCommandModToServer.TASK_COMPLETE, {
    gameID: g.game.id,
    task,
  });

  for (const tasks of Object.values(g.game.ourTasks)) {
    arrayRemoveInPlace(tasks, task);
  }

  taskLeave();
}

export function taskLeave(): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const taskDescription = taskDescriptions[g.game.currentTask];
  const roomName = skeldRoomReverseMap[taskDescription.room];
  if (roomName === undefined) {
    error(`Failed to get the room name for room: ${taskDescription.room}`);
  }

  g.game.currentTask = null;

  setupPlayerAndUI();
  enableMinimapAPI(true);

  clearRoomEntities();
  goToStageAPIRoom(roomName);
  movePlayerToGridIndex(taskDescription.returnGridIndex);
}

export function clearRoomEntities(): void {
  removeAllMatchingEntities(EntityType.ENTITY_BOMBDROP); // 4
  removeAllMatchingEntities(EntityType.ENTITY_PICKUP); // 5
  removeAllNPCs();
  removeAllGridEntities();
}

function removeAllNPCs() {
  const npcs = getNPCs();
  for (const npc of npcs) {
    npc.Remove();
  }
}

function removeAllGridEntities() {
  const game = Game();
  const room = game.GetRoom();

  // Sometimes, walls can appear in the center of the room due to StageAPI bugs
  // Remove every grid entity that is not positioned where a wall is supposed to be
  for (let gridIndex = 0; gridIndex < room.GetGridSize(); gridIndex++) {
    if (isWallGridIndex(gridIndex)) {
      continue;
    }

    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      removeGridEntity(gridEntity);
    }
  }
}
