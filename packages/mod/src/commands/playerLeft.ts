import { PlayerLeftDataToMod } from "common";
import { addLocalChat } from "../chat";
import g from "../globals";

export function commandPlayerLeft(data: PlayerLeftDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player !== undefined) {
    addLocalChat(`${player.username} left the game.`);
  }
}
