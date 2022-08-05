import { Keyboard } from "isaac-typescript-definitions";
import {
  addConsoleCommand,
  enableExtraConsoleCommands,
  log,
  ModUpgraded,
  registerHotkey,
  upgradeMod,
} from "isaacscript-common";
import * as entityTakeDmg from "./callbacks/entityTakeDmg";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as inputAction from "./callbacks/inputAction";
import * as postCurseEval from "./callbacks/postCurseEval";
import * as postEffectUpdate from "./callbacks/postEffectUpdate";
import * as postEntityKill from "./callbacks/postEntityKill";
import * as postNPCRender from "./callbacks/postNPCRender";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPlayerInit from "./callbacks/postPlayerInit";
import * as postRender from "./callbacks/postRender";
import * as postUpdate from "./callbacks/postUpdate";
import * as preGameExit from "./callbacks/preGameExit";
import * as postGameStartedReordered from "./callbacksCustom/postGameStartedReordered";
import * as postGridEntityUpdate from "./callbacksCustom/postGridEntityUpdate";
import * as postNewRoomReordered from "./callbacksCustom/postNewRoomReordered";
import * as postPickupCollect from "./callbacksCustom/postPickupCollect";
import * as postPlayerInitLate from "./callbacksCustom/postPlayerInitLate";
import * as postRoomLoad from "./callbacksCustom/postRoomLoad";
import * as postStageAPINewRoom from "./callbacksCustom/postStageAPINewRoom";
import { IS_DEV, MOD_NAME, VERSION } from "./constants";
import {
  debugFunction1,
  debugFunction2,
  hotkeyFunction1,
  hotkeyFunction2,
} from "./debug";
import { initFeatures } from "./initFeatures";
import * as collisionObjects from "./lib/collisionObjects";
import { disconnect } from "./network/socketClient";
import { skeldRoomReverseMap } from "./skeldRoomMap";
import { goToStageAPIRoom } from "./stageAPI";
import { SkeldRoom } from "./types/SkeldRoom";

main();

function main() {
  const modVanilla = RegisterMod("isaacAmongUsMod", 1);
  const mod = upgradeMod(modVanilla);

  initLibraries(mod);
  initFeatures();
  initCallbacks(mod);
  initCallbacksCustom(mod);
  initCallbacksStageAPI();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (IS_DEV) {
    enableExtraConsoleCommands(mod);
    addConsoleCommand("debug", debugFunction1);
    addConsoleCommand("debug2", debugFunction2);
    addConsoleCommand("w", warp);

    registerHotkey(Keyboard.F1, hotkeyFunction1);
    registerHotkey(Keyboard.F2, hotkeyFunction2);
    registerHotkey(Keyboard.F4, disconnect);
  }

  log(`${MOD_NAME} ${VERSION} initialized.`);
}

function initLibraries(mod: Mod) {
  collisionObjects.init(mod);
}

function initCallbacks(mod: ModUpgraded) {
  postUpdate.init(mod); // 1
  postRender.init(mod); // 2
  evaluateCache.init(mod); // 8
  postPlayerInit.init(mod); // 9
  entityTakeDmg.init(mod); // 11
  postCurseEval.init(mod); // 12
  inputAction.init(mod); // 13
  preGameExit.init(mod); // 17
  postNPCRender.init(mod); // 28
  postPickupInit.init(mod); // 34
  postEffectUpdate.init(mod); // 55
  postEntityKill.init(mod); // 68
}

function initCallbacksCustom(mod: ModUpgraded) {
  postNewRoomReordered.init(mod);
  postGameStartedReordered.init(mod);
  postGridEntityUpdate.init(mod);
  postPickupCollect.init(mod);
  postPlayerInitLate.init(mod);
}

function initCallbacksStageAPI() {
  if (StageAPI === undefined) {
    return;
  }

  // Nuke the existing callback, if it exists (in case we are performing the "luamod" console
  // command).
  StageAPI.UnregisterCallbacks(MOD_NAME);

  const callbackPriority = 1;

  StageAPI.AddCallback(
    MOD_NAME,
    StageAPICallback.POST_STAGEAPI_NEW_ROOM,
    callbackPriority,
    postStageAPINewRoom.main,
  );
  StageAPI.AddCallback(
    MOD_NAME,
    StageAPICallback.POST_ROOM_LOAD,
    callbackPriority,
    postRoomLoad.main,
  );
}

function warp(params: string) {
  let roomName: string | undefined;
  const num = tonumber(params);
  if (num === undefined) {
    roomName = params;
  } else {
    const skeldRoom = num as SkeldRoom;
    roomName = skeldRoomReverseMap[skeldRoom];
    if (roomName === undefined) {
      print(`Failed to find the room name for room ID: ${skeldRoom}`);
      return;
    }
  }

  goToStageAPIRoom(roomName);
  print(`Warped to room: ${roomName}`);
}
