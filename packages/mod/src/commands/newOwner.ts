import { NewOwnerDataToMod } from "common";
import { addLocalChat } from "../chat";
import { g } from "../globals";

export function commandNewOwner(data: NewOwnerDataToMod): void {
  if (g.game === null) {
    return;
  }

  const player = g.game.getPlayerFromUserID(data.userID);
  if (player === undefined) {
    return;
  }

  addLocalChat(`${player.username} is now thw owner of the game.`);
}
