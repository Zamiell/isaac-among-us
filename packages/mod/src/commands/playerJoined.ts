import { PlayerJoinedDataToMod } from "common";
import { addLocalChat } from "../chat";
import g from "../globals";

export function commandPlayerJoined(data: PlayerJoinedDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player !== undefined) {
    addLocalChat(`${player.username} joined the game.`);
  }
}
