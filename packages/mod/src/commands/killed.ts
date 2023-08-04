import type { KilledDataToMod } from "common";
import {
  EntityCollisionClass,
  EntityGridCollisionClass,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager, VectorZero } from "isaacscript-common";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { g } from "../globals";
import { mod } from "../mod";
import { getSkeldRoom } from "../stageAPI";

/** The death animation is 55 frames long, but we render it in 110 frames. */
const POST_DEATH_DELAY_RENDER_FRAMES = 110 + 30;

const KILLED_PLAYER_FADE = 0.25;

export function commandKilled(data: KilledDataToMod): void {
  if (g.game === null) {
    return;
  }

  const killedPlayer = g.game.getPlayerFromUserID(data.userIDKilled);
  if (killedPlayer === undefined) {
    error(`Failed to find the player for user ID: ${data.userIDKilled}`);
  }
  killedPlayer.alive = false;

  const renderFrameCount = Isaac.GetFrameCount();

  g.game.bodies.push({
    userID: data.userIDKilled,
    room: data.room,
    x: data.x,
    y: data.y,
    renderFrameKilled: renderFrameCount,
  });

  const weDied = killedPlayer.userID === g.userID;
  const room = getSkeldRoom();
  if (room !== killedPlayer.room) {
    if (weDied) {
      convertPlayerToGhostForm();
    }

    return;
  }

  if (weDied) {
    const player = Isaac.GetPlayer();
    player.Position = Vector(data.x, data.y);
    player.Velocity = VectorZero;
    player.ControlsEnabled = false;
    player.Visible = false;

    mod.runInNRenderFrames(
      convertPlayerToGhostForm,
      POST_DEATH_DELAY_RENDER_FRAMES,
    );
  }

  sfxManager.Play(SoundEffect.ISAAC_DIES);
  sfxManager.Play(SoundEffectCustom.KILL);
}

export function convertPlayerToGhostForm(): void {
  const player = Isaac.GetPlayer();

  const sprite = player.GetSprite();
  sprite.Color = Color(1, 1, 1, KILLED_PLAYER_FADE);

  player.ControlsEnabled = true;
  player.Visible = true;
  player.GridCollisionClass = EntityGridCollisionClass.NONE;
  player.EntityCollisionClass = EntityCollisionClass.NONE;
}
