import {
  getRoomSafeGridIndex,
  getScreenBottomRightPos,
} from "isaacscript-common";
import { MOD_NAME } from "../constants";
import { fonts } from "../fonts";
import g from "../globals";
import { isConsoleOpen } from "./console";
import { START_ROOM_INDEX } from "./goToEmptyRoom";

const NOTIFICATION_TEXT = `Welcome to the ${MOD_NAME} mod!\n\nPress enter, type /help, and then press enter again for
instructions on how to connect to the server.`;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (shouldDrawWelcomeNotification()) {
    drawWelcomeNotification();
  }
}

function shouldDrawWelcomeNotification() {
  if (g.game !== null) {
    return false;
  }

  const game = Game();
  const isPaused = game.IsPaused();
  if (isPaused) {
    return false;
  }

  const roomSafeGridIndex = getRoomSafeGridIndex();
  if (roomSafeGridIndex !== START_ROOM_INDEX) {
    return false;
  }

  if (isConsoleOpen()) {
    return false;
  }

  if (!g.welcomeNotificationEnabled) {
    return false;
  }

  return true;
}

function drawWelcomeNotification() {
  const bottomRightPos = getScreenBottomRightPos();
  const closeToBottom = bottomRightPos.Y - 58;
  const color = KColor(1, 1, 0, 1);

  let y = closeToBottom;
  for (const line of NOTIFICATION_TEXT.split("\n")) {
    fonts.pf.DrawString(line, 0, y, color, bottomRightPos.X, true);
    y += 10;
  }
}
