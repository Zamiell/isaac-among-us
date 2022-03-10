import { isKeyboardPressed } from "isaacscript-common";
import { IS_DEV } from "./constants";
import { startAutoLogin } from "./features/autoLogin";
import { startMeeting } from "./features/startMeeting";
import g from "./globals";
import { SkeldRoom } from "./types/SkeldRoom";

const DEBUG_HOTKEY1 = Keyboard.KEY_F1;
const DEBUG_HOTKEY2 = Keyboard.KEY_F2;

let hotkeyPressed1 = false;
let hotkeyPressed2 = false;

// From the "debug" console command
export function debugFunction1(): void {
  // Add code here
}

export function debugFunction2(): void {}

function hotkeyFunction1() {
  startAutoLogin();
}

function hotkeyFunction2() {
  startMeeting();
}

// ModCallbacks.MC_POST_UPDATE (1)
export function postUpdate(): void {
  postUpdateHotkey1();
  postUpdateHotkey2();
}

function postUpdateHotkey1() {
  if (isKeyboardPressed(DEBUG_HOTKEY1)) {
    if (!hotkeyPressed1) {
      hotkeyFunction1();
    }
    hotkeyPressed1 = true;
  } else {
    hotkeyPressed1 = false;
  }
}

function postUpdateHotkey2() {
  if (isKeyboardPressed(DEBUG_HOTKEY2)) {
    if (!hotkeyPressed2) {
      hotkeyFunction2();
    }
    hotkeyPressed2 = true;
  } else {
    hotkeyPressed2 = false;
  }
}

export function injectTestPlayers(): void {
  if (g.game === null || g.game.players.length !== 1 || !IS_DEV) {
    return;
  }

  const testPlayerNames = [
    "antizoubilamaka",
    "Hispa",
    "Gamonymous",
    "MoucheronQuipet",
    "leo_ze_tron",
    "AshD0wn",
    "Slash_SP",
    "Marcus",
    "thereisnofuture",
    "Dea1h",
    "Fawkeyes",
    "toooschi",
    "CrafterLynx",
    "Adrayon",
  ];
  const testPlayerCharacters = [
    1, 2, 3, 5, 6, 8, 9, 13, 18, 19, 21, 22, 23, 24,
  ];
  for (let i = 0; i < testPlayerNames.length; i++) {
    let alive = true;
    if (i === 1 || i === 3 || i === 8 || i === 10 || i === 13) {
      alive = false;
    }
    g.game.players.push({
      userID: 100 + i,
      username: testPlayerNames[i],
      connected: true,
      character: testPlayerCharacters[i],
      alive,
      room: SkeldRoom.CAFETERIA,
      usedEmergencyMeeting: false,
    });
  }
}
