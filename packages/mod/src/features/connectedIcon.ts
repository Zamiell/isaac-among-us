import { getScreenBottomRightPos } from "isaacscript-common";
import * as socketClient from "../network/socketClient";

const CONNECTED_ICON_OFFSET = Vector(-33, -30);
export const OTHER_UI_BUTTON_OFFSET = CONNECTED_ICON_OFFSET.add(Vector(5, -30));

const connectedSprite = Sprite();
connectedSprite.Load("gfx/wifi.anm2", true);
connectedSprite.SetFrame("Default", 0);

export function postRender(): void {
  if (!socketClient.isConnected()) {
    return;
  }

  const bottomRightPos = getScreenBottomRightPos();
  const position = bottomRightPos.add(CONNECTED_ICON_OFFSET);
  connectedSprite.RenderLayer(0, position);
}
