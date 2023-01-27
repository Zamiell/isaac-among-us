import { PlayerJoinedDataToMod } from "common";
import { sfxManager } from "isaacscript-common";
import { addLocalChat } from "../chat";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import * as autoLogin from "../features/autoLogin";
import { g } from "../globals";

export function commandPlayerJoined(data: PlayerJoinedDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player === undefined) {
    return;
  }

  addLocalChat(`${player.username} joined the game.`);
  sfxManager.Play(SoundEffectCustom.PLAYER_JOINED);
  autoLogin.onPlayerJoined(data.userID);
}
