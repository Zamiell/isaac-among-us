import { sfxManager } from "isaacscript-common";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { KilledDataToMod } from "../types/SocketCommands";

const killedSprites: Sprite[] = [];

export function commandKilled(data: KilledDataToMod): void {
  if (g.game === null) {
    return;
  }

  const killedPlayer = g.game.getPlayerFromUserID(data.userIDKilled);
  if (killedPlayer === null) {
    error(`Failed to find the player for user ID: ${data.userIDKilled}`);
  }
  killedPlayer.alive = false;

  const weDied = killedPlayer.userID === g.userID;
  const room = getSkeldRoom();
  if (room !== killedPlayer.room) {
    if (weDied) {
      // TODO go immediately to ghost form
    }

    return;
  }

  if (killedPlayer.userID === g.userID) {
    const player = Isaac.GetPlayer();
    player.Position = Vector(data.x, data.y);
    player.Velocity = Vector.Zero;
    player.ControlsEnabled = false;
    player.Visible = false;
  } else {
    // TODO make other player sprite invisible
  }

  // TODO CREATE PLAYER SPRITE AND RENDER IT

  sfxManager.Play(SoundEffect.SOUND_ISAACDIES);
}

export function postRender(): void {
  /*
  for (const sprite of killedSprites) {
    sprite.Render(position, Vector.Zero, Vector.Zero)
  }
  */
}
