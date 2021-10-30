import { getScreenBottomRightPos } from "isaacscript-common";
import { MOD_NAME } from "../constants";
import { fonts } from "../fonts";
import g from "../globals";

const NOTIFICATION_LENGTH = 600;
const NOTIFICATION_TEXT = `Welcome to the ${MOD_NAME} mod!\n\nPress enter, type /help, and then press enter again for
instructions on how to connect to the server.`;

let displayedNotification = false;
let timer: int | null = null;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game !== null) {
    return;
  }

  if (timer === null) {
    return;
  }

  timer -= 1;
  if (timer === 0) {
    timer = null;
    return;
  }

  const game = Game();
  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  const bottomRightPos = getScreenBottomRightPos();
  const closeToBottom = bottomRightPos.Y - 58;
  const alpha = (math.min(timer, 60) / 60) * 0.5;
  const color = KColor(1, 1, 0, alpha);

  let y = closeToBottom;
  for (const line of NOTIFICATION_TEXT.split("\n")) {
    fonts.pf.DrawString(line, 0, y, color, bottomRightPos.X, true);
    y += 10;
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
export function postGameStarted(): void {
  if (displayedNotification) {
    return;
  }

  displayedNotification = true;
  timer = NOTIFICATION_LENGTH;
}
