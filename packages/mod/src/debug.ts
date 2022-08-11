import { IS_DEV, SkeldRoom } from "common";
import { startAutoLogin } from "./features/autoLogin";
import { startMeeting } from "./features/startMeeting";
import g from "./globals";
import { skeldRoomReverseMap } from "./skeldRoomMap";
import { goToStageAPIRoom } from "./stageAPI";

/** From the "d" console command. */
export function debugFunction1(): void {
  // Add code here
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
export function hotkeyFunction2(): void {
  startMeeting();
}

export function injectTestPlayers(): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
    "Marcus",
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
  for (let i = 0; i < testPlayerNames.length; i++) {
    let alive = true;
    if (i === 1 || i === 3 || i === 8 || i === 10 || i === 13) {
      alive = false;
    }
    g.game.players.push({
      index: g.game.players.length,
      userID: 100 + i,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      username: testPlayerNames[i]!,
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
    roomName = params;
  } else {
    const skeldRoom = num as SkeldRoom;
    roomName = skeldRoomReverseMap[skeldRoom];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (roomName === undefined) {
      print(`Failed to find the room name for room ID: ${skeldRoom}`);
      return;
    }
  }

  goToStageAPIRoom(roomName);
  print(`Warped to room: ${roomName}`);
}
