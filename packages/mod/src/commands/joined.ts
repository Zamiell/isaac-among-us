import type { JoinedDataToMod } from "common";
import { restart } from "isaacscript-common";
import { addLocalChat } from "../chat";
import { AmongUsGame } from "../classes/AmongUsGame";
import { g } from "../globals";

export function commandJoined(data: JoinedDataToMod): void {
  g.game = new AmongUsGame(
    data.gameID,
    data.name,
    data.ownerUserID,
    data.character,
  );

  const msg = getChatMessage(data);
  addLocalChat(msg);
  restart();
}

function getChatMessage(data: JoinedDataToMod) {
  if (data.reconnected) {
    return `Reconnected to game: ${data.name}`;
  }

  if (data.created) {
    const passwordText = data.hasPassword ? "(password-protected)" : "(public)";
    return `Created game: ${data.name} ${passwordText}`;
  }

  return `Joined game: ${data.name}`;
}
