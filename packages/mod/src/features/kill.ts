import {
  anyPlayerCloserThan,
  getScreenBottomRightPos,
} from "isaacscript-common";
import g from "../globals";
import { initSprite } from "../sprite";
import { Role } from "../types/Role";
import { getRoomIndexModified } from "../util";

const KILL_DISTANCE = 60;
const CONNECTED_ICON_OFFSET = Vector(-33, -30);

const sprite = initSprite("gfx/ui/kill.anm2");

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (!ableToKillAPlayer()) {
    return;
  }
  Isaac.DebugString("GETTING HERE 2");

  const bottomRightPos = getScreenBottomRightPos();
  // const position = bottomRightPos.add(OTHER_UI_BUTTON_OFFSET);
  const position = bottomRightPos.add(CONNECTED_ICON_OFFSET);
  sprite.RenderLayer(0, position);
}

function ableToKillAPlayer() {
  if (
    g.game === null ||
    !g.game.started ||
    g.game.meeting !== null ||
    g.game.role !== Role.IMPOSTER
  ) {
    return false;
  }

  const roomIndex = getRoomIndexModified();

  for (const playerData of g.game.playerMap.values()) {
    if (playerData.roomIndex !== roomIndex) {
      continue;
    }

    const otherPlayerPosition = Vector(playerData.x, playerData.y);

    if (anyPlayerCloserThan(otherPlayerPosition, KILL_DISTANCE)) {
      return true;
    }
  }

  return false;
}
