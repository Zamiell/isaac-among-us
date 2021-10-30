import { getScreenBottomRightPos } from "isaacscript-common";
import * as socketClient from "../network/socketClient";

const ICON_OFFSET = Vector(-33, -30);

const connectedSprite = Sprite();
connectedSprite.Load("gfx/wifi.anm2", true);
connectedSprite.SetFrame("Default", 0);

export function postRender(): void {
  if (!socketClient.isConnected()) {
    return;
  }

  const bottomRightPos = getScreenBottomRightPos();
  const position = bottomRightPos.add(ICON_OFFSET);
  connectedSprite.RenderLayer(0, position);
}
