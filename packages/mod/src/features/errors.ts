import {
  getMaxCollectibleID,
  log,
  MAX_VANILLA_COLLECTIBLE_TYPE,
  saveDataManager,
} from "isaacscript-common";
import { MOD_NAME } from "../constants";
import { isLuaDebugEnabled } from "../network/socketClient";

const STARTING_X = 115;
const STARTING_Y = 70;
const SPACE_BETWEEN_LINES = 12;
const MAX_CHARACTERS = 55;
const LUA_DEBUG_ERROR_TEXT = `Error: You do not have the "--luadebug" launch option turned on. This option is needed so that Isaac can communicate with Internet servers.\n\nTo turn on "--luadebug", perform the following steps:
- Open Steam.
- Click on the "Library" tab near the top of the screen.
- Right-click on "The Binding of Isaac: Rebirth" and select "Properties".
- Click on the "General" tab on the left.
- At the bottom of the screen, there will be a box to specify "Launch Options".
- Enter "--luadebug" in the box (without the quotations).
- Close the window and then completely close and re-open the game.`;

const v = {
  run: {
    corrupted: false,
    incompleteSave: false,
    otherModsEnabled: false,
  },
};

export function init(): void {
  saveDataManager("errors", v);
}

export function check(): boolean {
  return areOtherModsEnabled();
}

// Check to see if there are any mods enabled that have added custom items
// (it is difficult to detect other mods in other ways)
function areOtherModsEnabled() {
  const maxCollectibleID = getMaxCollectibleID();
  const correctMaxCollectibleID = MAX_VANILLA_COLLECTIBLE_TYPE;

  if (maxCollectibleID !== correctMaxCollectibleID) {
    log(
      `Error: Other mods detected. (The highest collectible ID is ${maxCollectibleID}, but it should be ${correctMaxCollectibleID}.)`,
    );
    v.run.otherModsEnabled = true;
  }

  return v.run.otherModsEnabled;
}

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): boolean {
  if (REPENTANCE === undefined) {
    drawText(
      `Error: You must have the Repentance DLC installed in order to use the ${MOD_NAME} mod.`,
    );
    return true;
  }

  if (!isLuaDebugEnabled()) {
    drawText(LUA_DEBUG_ERROR_TEXT);
    return true;
  }

  if (StageAPI === undefined) {
    drawText(
      "Error: You do not have StageAPI loaded. Please subscribe to StageAPI on the Steam Workshop, enable it in the mods menu, and then completely close and re-open the game.",
    );
    return true;
  }

  if (MinimapAPI === undefined) {
    drawText(
      "Error: You do not have MinimapAPI loaded. Please subscribe to MinimapAPI on the Steam Workshop, enable it in the mods menu, and then completely close and re-open the game.",
    );
    return true;
  }

  if (v.run.otherModsEnabled) {
    drawText(
      `Error: You have illegal mods enabled.\n\nMake sure that the ${MOD_NAME} mod, StageAPI, and MinimapAPI are the only mods enabled in your mod list and then completely close and re-open the game.`,
    );
    return true;
  }

  return false;
}

function drawText(text: string) {
  const x = STARTING_X;
  let y = STARTING_Y;

  for (const rawLine of text.split("\n")) {
    const lines = wordWrap(rawLine);
    for (const line of lines) {
      Isaac.RenderText(line, x, y, 2, 2, 2, 2);
      y += SPACE_BETWEEN_LINES;
    }
  }
}

function wordWrap(line: string): string[] {
  let spaceLeft = MAX_CHARACTERS;
  const words = line.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length + 1 > spaceLeft) {
      words[i] = `\n${word}`;
      spaceLeft = MAX_CHARACTERS - word.length;
    } else {
      spaceLeft -= word.length + 1;
    }
  }

  return words.join(" ").split("\n");
}
