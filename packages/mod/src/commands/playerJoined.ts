import { PlayerJoinedDataToMod } from "common";
import { sfxManager } from "isaacscript-common";
import { addLocalChat } from "../chat";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import g from "../globals";
import { inCutscene } from "../utils";

export function commandPlayerJoined(data: PlayerJoinedDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player === undefined) {
    return;
  }

  addLocalChat(`${player.username} joined the game.`);

  if (!inCutscene()) {
    sfxManager.Play(SoundEffectCustom.PLAYER_JOINED);
  }
}
