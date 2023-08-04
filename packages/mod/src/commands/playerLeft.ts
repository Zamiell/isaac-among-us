import type { PlayerLeftDataToMod } from "common";
import { sfxManager } from "isaacscript-common";
import { addLocalChat } from "../chat";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { g } from "../globals";

export function commandPlayerLeft(data: PlayerLeftDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player === undefined) {
    return;
  }

  addLocalChat(`${player.username} left the game.`);
  sfxManager.Play(SoundEffectCustom.PLAYER_LEFT);
}
