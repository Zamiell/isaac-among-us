import { PlayerType, SoundEffect } from "isaac-typescript-definitions";
import { runInNRenderFrames, sfxManager, VectorZero } from "isaacscript-common";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { KilledDataToMod } from "../types/SocketCommands";

/** The death animation is 55 frames long, but we render it in 110 frames. */
const POST_DEATH_DELAY_RENDER_FRAMES = 110 + 30;

export function commandKilled(data: KilledDataToMod): void {
  if (g.game === null) {
    return;
  }

  const killedPlayer = g.game.getPlayerFromUserID(data.userIDKilled);
  if (killedPlayer === undefined) {
    error(`Failed to find the player for user ID: ${data.userIDKilled}`);
  }
  killedPlayer.alive = false;

  const isaacFrameCount = Isaac.GetFrameCount();

  g.game.bodies.push({
    userID: data.userIDKilled,
    room: data.room,
    x: data.x,
    y: data.y,
    renderFrameKilled: isaacFrameCount,
  });

  const weDied = killedPlayer.userID === g.userID;
  const room = getSkeldRoom();
  if (room !== killedPlayer.room) {
    if (weDied) {
      // TODO: go immediately to ghost form
    }

    return;
  }

  if (weDied) {
    const player = Isaac.GetPlayer();
    player.Position = Vector(data.x, data.y);
    player.Velocity = VectorZero;
    player.ControlsEnabled = false;
    player.Visible = false;

    runInNRenderFrames(() => {
      player.ChangePlayerType(PlayerType.THE_LOST);
      const sprite = player.GetSprite();
      sprite.Color = Color(1, 1, 1, 0.5);

      player.ControlsEnabled = true;
      player.Visible = true;
    }, POST_DEATH_DELAY_RENDER_FRAMES);
  }

  // TODO: CREATE PLAYER SPRITE AND RENDER IT

  /// const playerEffect = spawnPlayerEffect();

  sfxManager.Play(SoundEffect.ISAAC_DIES);
}
