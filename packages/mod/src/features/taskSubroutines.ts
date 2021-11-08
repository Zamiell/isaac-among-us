import {
  arrayRemoveInPlace,
  getNPCs,
  removeAllMatchingEntities,
  runNextFrame,
} from "isaacscript-common";
import { taskDescriptions } from "../constants";
import { EffectVariantCustom } from "../enums";
import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { sendTCP } from "../network/send";
import { setupPlayerAndUI } from "../setupPlayersAndUI";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { SocketCommandModToServer } from "../types/SocketCommands";
import { removeGridEntity } from "../util";
import { isWallGridIndex } from "../wall";

const sfx = SFXManager();

export function taskComplete(): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const task = g.game.currentTask;

  muteSoundEffects();
  runNextFrame(() => {
    // Some sound effects might not happen until the next frame,
    // so mute everything again just in case
    muteSoundEffects();
  });

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

function muteSoundEffects() {
  for (const soundEffect of [
    SoundEffect.SOUND_THUMBSUP,
    SoundEffect.SOUND_DEATH_BURST_SMALL,
    SoundEffect.SOUND_BOSS1_EXPLOSIONS,
    SoundEffect.SOUND_ROCK_CRUMBLE,
  ]) {
    sfx.Stop(soundEffect);
  }
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
  g.game.endTaskTime = Isaac.GetTime();
  const elapsedTime = g.game.endTaskTime - g.game.startTaskTime;
  Isaac.DebugString(`Task took: ${elapsedTime}`);

  setupPlayerAndUI();
  enableMinimapAPI(true);

  clearRoomEntities();
  goToStageAPIRoom(roomName, taskDescription.returnGridIndex);
}

export function clearRoomEntities(): void {
  removeAllMatchingEntities(EntityType.ENTITY_BOMBDROP); // 4
  removeAllMatchingEntities(EntityType.ENTITY_PICKUP); // 5
  removeAllMatchingEntities(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.BUTTON,
  );
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
