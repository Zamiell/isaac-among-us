import { sfxManager } from "isaacscript-common";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { KilledDataToMod } from "../types/SocketCommands";

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
      // TODO go immediately to ghost form
    }

    return;
  }

  if (weDied) {
    const player = Isaac.GetPlayer();
    player.Position = Vector(data.x, data.y);
    player.Velocity = Vector.Zero;
    player.ControlsEnabled = false;
    player.Visible = false;
  } else {
    // TODO make other player sprite invisible
  }

  // TODO CREATE PLAYER SPRITE AND RENDER IT
  // const playerEffect = spawnPlayerEffect();

  sfxManager.Play(SoundEffect.SOUND_ISAACDIES);
}
