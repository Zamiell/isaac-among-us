import { UserConnectedDataToMod } from "common";
import { addLocalChat } from "../chat";
import g from "../globals";

export function commandUserConnected(data: UserConnectedDataToMod): void {
  // Don't display notifications for ourselves.
  if (data.userID === g.userID) {
    return;
  }

  // Don't display notifications if we are currently in a game. (We will get a message when they
  // explicitly join the game.)
  if (g.game !== null) {
    return;
  }

  const verb = data.connected ? "connected" : "disconnected";
  addLocalChat(`User ${verb}: ${data.username}`);
}
