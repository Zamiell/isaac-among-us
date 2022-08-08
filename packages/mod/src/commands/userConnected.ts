import { UserConnectedDataToMod } from "common";
import * as chat from "../chat";
import g from "../globals";

export function commandUserConnected(data: UserConnectedDataToMod): void {
  // Don't display notifications for ourselves.
  if (data.userID === g.userID) {
    return;
  }

  // Don't display notifications for players who are not in our current game.
  if (g.game !== null && !g.game.isPlayerJoined(data.userID)) {
    return;
  }

  const verb = data.connected ? "connected" : "disconnected";
  chat.addLocal(`User ${verb}: ${data.username}`);
}
