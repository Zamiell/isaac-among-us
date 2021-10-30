import g from "../globals";
import { isConsoleOpen } from "./console";
import { drawUsername } from "./drawOtherPlayers";

export function postRender(): void {
  if (g.game === null || g.username === null || isConsoleOpen()) {
    return;
  }

  const player = Isaac.GetPlayer();
  if (!player.Visible) {
    return;
  }

  const amImposter = g.game.imposters !== null;
  drawUsername(player.Position, g.username, undefined, amImposter);
}
