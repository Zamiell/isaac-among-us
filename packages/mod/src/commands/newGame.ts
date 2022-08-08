import { NewGameDataToMod } from "common";
import * as chat from "../chat";
import g from "../globals";

export function commandNewGame(data: NewGameDataToMod): void {
  // Don't display new game notifications if we are already in a game.
  if (g.game !== null) {
    return;
  }

  chat.addLocal(`${data.creator} created a new game: ${data.name}`);
}
