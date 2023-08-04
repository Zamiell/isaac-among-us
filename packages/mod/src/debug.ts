import { IS_DEV, SkeldRoom } from "common";
import { getPartialMatch, logError } from "isaacscript-common";
import { startAutoLogin } from "./features/autoLogin";
import { startEndGameCutscene } from "./features/endGameCutscene";
import { g } from "./globals";
import { getSkeldRoomName, getSkeldRoomNames } from "./skeldRoomMap";
import { goToStageAPIRoom } from "./stageAPI";

const TEST_PLAYERS = [
  ["antizoubilamaka", 1], // cspell:disable-line
  ["Hispa", 2], // cspell:disable-line
  ["Gamonymous", 3], // cspell:disable-line
  ["MoucheronQuipet", 5], // cspell:disable-line
  ["leo_ze_tron", 6],
  ["AshD0wn", 8],
  ["Slash_SP", 9],
  ["StoneAgeMarcus", 13],
  ["thereisnofuture", 18], // cspell:disable-line
  ["Dea1h", 19],
  ["Fawkeyes", 21], // cspell:disable-line
  ["toooschi", 22], // cspell:disable-line
  ["CrafterLynx", 23],
  ["Adrayon", 24], // cspell:disable-line
] as const;

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
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function hotkeyFunction2(): void {}

export function injectTestPlayers(): void {
  if (g.game === null || g.game.players.length !== 1 || !IS_DEV) {
    return;
  }

  for (const [i, [username, character]] of TEST_PLAYERS.entries()) {
    let alive = true;
    if (i === 1 || i === 3 || i === 8 || i === 10 || i === 13) {
      alive = false;
    }

    g.game.players.push({
      index: g.game.players.length,
      userID: 100 + i,
      username,
      connected: true,
      character,
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
