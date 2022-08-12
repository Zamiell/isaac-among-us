import { SocketCommandModToServer, TASK_DESCRIPTIONS } from "common";
import { EntityType, SoundEffect } from "isaac-typescript-definitions";
import {
  arrayRemoveInPlace,
  game,
  getNPCs,
  removeAllMatchingEntities,
  runNextGameFrame,
  sfxManager,
} from "isaacscript-common";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { sendTCP } from "../network/send";
import { setupPlayerAndUI } from "../setupPlayersAndUI";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { removeGridEntity } from "../utils";
import { isWallGridIndex } from "../wall";

export function taskComplete(): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const task = g.game.currentTask;

  muteSoundEffects();
  runNextGameFrame(() => {
    // Some sound effects might not happen until the next frame, so mute everything again just in
    // case.
    muteSoundEffects();
  });

  sfxManager.Play(SoundEffectCustom.TASK_COMPLETE);

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
    SoundEffect.THUMBS_UP,
    SoundEffect.DEATH_BURST_SMALL,
    SoundEffect.BOSS_1_EXPLOSIONS,
    SoundEffect.ROCK_CRUMBLE,
  ]) {
    sfxManager.Stop(soundEffect);
  }
}

export function taskLeave(): void {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  const taskDescription = TASK_DESCRIPTIONS[g.game.currentTask];
  const roomName = skeldRoomReverseMap[taskDescription.room];

  g.game.currentTask = null;
  g.game.endTaskTime = Isaac.GetTime();
  const elapsedTime = g.game.endTaskTime - g.game.startTaskTime;
  Isaac.DebugString(`Task took: ${elapsedTime}`);

  setupPlayerAndUI();
  enableMinimapAPI();

  clearRoomEntities();
  goToStageAPIRoom(roomName, taskDescription.returnGridIndex);
}

export function clearRoomEntities(): void {
  removeAllMatchingEntities(EntityType.BOMB); // 4
  removeAllMatchingEntities(EntityType.PICKUP); // 5
  removeAllMatchingEntities(EntityType.EFFECT, EffectVariantCustom.BUTTON);
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
  const room = game.GetRoom();

  // Sometimes, walls can appear in the center of the room due to StageAPI bugs Remove every grid
  // entity that is not positioned where a wall is supposed to be.
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
