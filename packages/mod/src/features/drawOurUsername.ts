import { g } from "../globals";
import { isConsoleOpen } from "./console";
import { drawUsername } from "./drawOtherPlayers";

export function postRender(): void {
  if (g.game === null || g.userID === null || isConsoleOpen()) {
    return;
  }

  const player = Isaac.GetPlayer();
  if (!player.Visible) {
    return;
  }

  drawUsername(g.userID, player.Position);
}
