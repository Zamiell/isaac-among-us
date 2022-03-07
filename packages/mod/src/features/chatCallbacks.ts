import * as chat from "../chat";
import { fonts } from "../fonts";
import g from "../globals";
import { Colors } from "../types/Colors";
import { getScreenPosition } from "../utils";
import {
  CONSOLE_POSITION,
  CONSOLE_POSITION_LEFT,
  isConsoleOpen,
  SPACING_FROM_LEFT_EDGE,
} from "./console";
import { DEFAULT_OPACITY, drawText } from "./drawText";

const CHAT_POSITION_VERTICAL_OFFSET = Vector(0, -15);
const CHAT_POSITION = CONSOLE_POSITION.add(CHAT_POSITION_VERTICAL_OFFSET);
const CHAT_POSITION_LEFT = CONSOLE_POSITION_LEFT.add(
  CHAT_POSITION_VERTICAL_OFFSET,
);
const rightSideTextCutoffX = getScreenPosition(1 - SPACING_FROM_LEFT_EDGE, 0).X;
const MAX_TEXT_WIDTH = rightSideTextCutoffX - CHAT_POSITION.X;
const WIDTH_OF_SPACE = fonts.pf.GetStringWidth(" ");
const LINE_LENGTH = 13;
const MAX_CHAT_MESSAGES = 10;
// const FADED_CHAT_OPACITY = 0.15;
const FRAMES_FOR_CHAT_TO_SHOW = 120;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  drawChat();
}

function drawChat() {
  const isaacFrameCount = Isaac.GetFrameCount();
  const consoleOpen = isConsoleOpen();

  // If the console is open, display the last N messages with default opacity
  // Otherwise, only display recent messages,
  // and fade them so that they do not interfere with gameplay as much
  // (disabled)
  // const alpha = consoleOpen ? DEFAULT_OPACITY : FADED_CHAT_OPACITY;
  const alpha = DEFAULT_OPACITY;

  const x = g.game?.meeting !== null ? CHAT_POSITION_LEFT.X : CHAT_POSITION.X;
  let y = CHAT_POSITION.Y;

  let numMessagesDrawn = 0;
  for (const chatMessage of chat.getAll()) {
    // Local messages should always be displayed at full opacity to begin with
    let modifiedAlpha = chatMessage.local ? DEFAULT_OPACITY : alpha;

    // Make chat messages slowly fade away (if the console is closed)
    const framesElapsed = isaacFrameCount - chatMessage.frameReceived;
    if (!consoleOpen && framesElapsed > FRAMES_FOR_CHAT_TO_SHOW) {
      const framesOverThreshold = framesElapsed - FRAMES_FOR_CHAT_TO_SHOW;
      modifiedAlpha -= framesOverThreshold / (FRAMES_FOR_CHAT_TO_SHOW * 2);
    }
    if (modifiedAlpha <= 0) {
      break;
    }

    let text = "";
    if (chatMessage.time !== "" && !chatMessage.local) {
      text += `[${chatMessage.time}] `;
    }
    if (chatMessage.username !== "") {
      text += `${Colors.GREEN}<${chatMessage.username}>${Colors.WHITE} `;
    }
    text += chatMessage.msg;

    const lines = wordWrap(text);
    y -= (lines.length - 1) * LINE_LENGTH;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      drawText(line, Vector(x, y), modifiedAlpha);
      y += LINE_LENGTH;
    }
    y -= (lines.length + 1) * LINE_LENGTH;

    numMessagesDrawn += 1;
    if (numMessagesDrawn > MAX_CHAT_MESSAGES) {
      break;
    }
  }
}

function wordWrap(line: string): string[] {
  let spaceLeft = MAX_TEXT_WIDTH;
  const words = line.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordWidth = fonts.pf.GetStringWidth(word);
    if (wordWidth + WIDTH_OF_SPACE > spaceLeft) {
      words[i] = `\n${word}`;
      spaceLeft = MAX_TEXT_WIDTH - wordWidth;
    } else {
      spaceLeft -= wordWidth + WIDTH_OF_SPACE;
    }
  }

  return words.join(" ").split("\n");
}
