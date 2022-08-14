import { getScreenBottomRightPos, todo } from "isaacscript-common";
import { initSprite } from "../sprite";
import { OTHER_UI_BUTTON_OFFSET } from "./connectedIcon";
import { ableToKillAPlayer } from "./kill";
import { ableToReportDeadBody } from "./report";
import { ableToVent } from "./vents";

const sprites = {
  kill: initSprite("gfx/ui/kill.anm2"),
  report: initSprite("gfx/ui/report.anm2"),
  vent: initSprite("gfx/ui/vent.anm2"),
};

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (ableToKillAPlayer()) {
    drawSprite(sprites.kill);
    return;
  }

  if (ableToVent()) {
    drawSprite(sprites.vent);
    return;
  }

  if (ableToReportDeadBody()) {
    drawSprite(sprites.report);
    return;
  }

  todo();
}

function drawSprite(sprite: Sprite) {
  const bottomRightPos = getScreenBottomRightPos();
  const position = bottomRightPos.add(OTHER_UI_BUTTON_OFFSET);
  sprite.RenderLayer(0, position);
}
