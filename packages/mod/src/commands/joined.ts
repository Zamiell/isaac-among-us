import { JoinedDataToMod } from "common";
import { addLocalChat } from "../chat";
import { AmongUsGame } from "../classes/AmongUsGame";
import g from "../globals";
import { restart } from "../utils";

export function commandJoined(data: JoinedDataToMod): void {
  g.game = new AmongUsGame(data.gameID, data.name, data.character);

  const msg = getChatMessage(data);
  addLocalChat(msg);

  restart();
}

function getChatMessage(data: JoinedDataToMod) {
  if (data.reconnected) {
    return `Reconnected to game: ${data.name}`;
  }

  if (data.created) {
    return `Created game: ${data.name}`;
  }

  return `Joined game: ${data.name}`;
}
