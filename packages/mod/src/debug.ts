import { IS_DEV, SkeldRoom } from "common";
import { getPartialMatch, logError } from "isaacscript-common";
import { startAutoLogin } from "./features/autoLogin";
import { startEndGameCutscene } from "./features/endGameCutscene";
import { g } from "./globals";
import { getSkeldRoomName, getSkeldRoomNames } from "./skeldRoomMap";
import { goToStageAPIRoom } from "./stageAPI";

/** From the "d" console command. */
export function debugFunction1(): void {
  // Add code here
  startEndGameCutscene();
}

/** From the "d2" console command. */
export function debugFunction2(): void {
  // Add code here
}

/** Bound to F1. */
export function hotkeyFunction1(): void {
  startAutoLogin();
}

/** Bound to F2. */
export function hotkeyFunction2(): void {}

export function injectTestPlayers(): void {
  if (g.game === null || g.game.players.length !== 1 || !IS_DEV) {
    return;
  }

  const testPlayerNames = [
    "antizoubilamaka", // cspell:disable-line
    "Hispa", // cspell:disable-line
    "Gamonymous", // cspell:disable-line
    "MoucheronQuipet", // cspell:disable-line
    "leo_ze_tron",
    "AshD0wn",
    "Slash_SP",
    "StoneAgeMarcus",
    "thereisnofuture", // cspell:disable-line
    "Dea1h",
    "Fawkeyes", // cspell:disable-line
    "toooschi", // cspell:disable-line
    "CrafterLynx",
    "Adrayon", // cspell:disable-line
  ];
  const testPlayerCharacters = [
    1, 2, 3, 5, 6, 8, 9, 13, 18, 19, 21, 22, 23, 24,
  ];
  for (const [i, testPlayerName] of testPlayerNames.entries()) {
    let alive = true;
    if (i === 1 || i === 3 || i === 8 || i === 10 || i === 13) {
      alive = false;
    }
    g.game.players.push({
      index: g.game.players.length,
      userID: 100 + i,
       
      username: testPlayerName,
      connected: true,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      character: testPlayerCharacters[i]!,
      alive,
      room: SkeldRoom.CAFETERIA,
      usedEmergencyMeeting: false,
    });
  }
}

export function warp(params: string): void {
  let roomName: string | undefined;

  const num = tonumber(params);
  if (num === undefined) {
    const roomNames = getSkeldRoomNames();
    const partialMatch = getPartialMatch(params, roomNames);
    if (partialMatch === undefined) {
      logError(`Failed to find the room name corresponding to: ${params}`);
      return;
    }

    roomName = partialMatch;
  } else {
    const room = num as SkeldRoom;
    const potentialRoomName = getSkeldRoomName(room);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (potentialRoomName === undefined) {
      logError(`Failed to find the room name for room ID: ${room}`);
      return;
    }

    roomName = potentialRoomName;
  }

  goToStageAPIRoom(roomName);
  logError(`Warped to room: ${roomName}`);
}
