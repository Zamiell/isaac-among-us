import { Difficulty } from "isaac-typescript-definitions";
import { game, LAST_VANILLA_COLLECTIBLE_TYPE, log } from "isaacscript-common";
import { MOD_NAME } from "../constants";
import { mod } from "../mod";
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
    otherModsEnabled: false,
    wrongDifficulty: false,
  },
};

export function init(): void {
  mod.saveDataManager("errors", v);
}

export function postGameStarted(): boolean {
  return areOtherModsEnabled() || isWrongDifficulty();
}

// Check to see if there are any mods enabled that have added custom items. (It is difficult to
// detect other mods in other ways.)
function areOtherModsEnabled() {
  const lastCollectibleType = mod.getLastCollectibleType();

  if (lastCollectibleType !== LAST_VANILLA_COLLECTIBLE_TYPE) {
    log(
      `Error: Other mods detected. (The highest collectible type is ${lastCollectibleType}, but it should be ${LAST_VANILLA_COLLECTIBLE_TYPE}.)`,
    );
    v.run.otherModsEnabled = true;
  }

  return v.run.otherModsEnabled;
}

function isWrongDifficulty() {
  const rightDifficulty = Difficulty.NORMAL;
  if (game.Difficulty !== rightDifficulty) {
    log(
      `Error: Wrong difficulty detected. (The current difficulty is ${game.Difficulty}, but it should be ${rightDifficulty}.)`,
    );
    v.run.wrongDifficulty = true;
  }

  return v.run.wrongDifficulty;
}

// ModCallback.POST_RENDER (2)
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

  if (v.run.wrongDifficulty) {
    drawText(
      "Error: You are not on a normal run. Please restart a run on normal difficulty.",
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const word = words[i]!;
    if (word.length + 1 > spaceLeft) {
      words[i] = `\n${word}`;
      spaceLeft = MAX_CHARACTERS - word.length;
    } else {
      spaceLeft -= word.length + 1;
    }
  }

  return words.join(" ").split("\n");
}
