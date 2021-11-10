import { getScreenBottomRightPos } from "isaacscript-common";
import g from "../globals";
import { sendTCP } from "../network/send";
import { getClosestAmongUsPlayer } from "../players";
import { initSprite } from "../sprite";
import { SocketCommandModToServer } from "../types/SocketCommands";
import { OTHER_UI_BUTTON_OFFSET } from "./connectedIcon";
import { ableToKillAPlayer } from "./killSubroutines";

const sprite = initSprite("gfx/ui/kill.anm2");

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (!ableToKillAPlayer()) {
    return;
  }

  drawKillUI();
}

function drawKillUI() {
  const bottomRightPos = getScreenBottomRightPos();
  const position = bottomRightPos.add(OTHER_UI_BUTTON_OFFSET);
  sprite.RenderLayer(0, position);
}

export function kill(): void {
  if (g.game === null) {
    return;
  }

  const closestPlayer = getClosestAmongUsPlayer();
  if (closestPlayer === null) {
    return;
  }

  sendTCP(SocketCommandModToServer.KILL, {
    gameID: g.game.id,
    userIDKilled: closestPlayer.userID,
    room: closestPlayer.roomIndex,
    x: closestPlayer.x,
    y: closestPlayer.y,
  });
}
