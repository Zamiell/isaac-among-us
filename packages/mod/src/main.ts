import { IS_DEV } from "common";
import { Keyboard } from "isaac-typescript-definitions";
import { log } from "isaacscript-common";
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
import { MOD_NAME, VERSION } from "./constants";
import {
  debugFunction1,
  debugFunction2,
  hotkeyFunction1,
  hotkeyFunction2,
  warp,
} from "./debug";
import { initFeatures } from "./initFeatures";
import * as collisionObjects from "./lib/collisionObjects";
import { mod } from "./mod";
import { disconnect } from "./network/socketClient";

export function main(): void {
  initLibraries();
  initFeatures();
  initCallbacks();
  initCallbacksCustom();
  initCallbacksStageAPI();

  if (IS_DEV) {
    mod.addConsoleCommand("d", debugFunction1);
    mod.addConsoleCommand("d2", debugFunction2);
    mod.addConsoleCommand("w", warp);

    mod.setHotkey(Keyboard.F1, hotkeyFunction1);
    mod.setHotkey(Keyboard.F2, hotkeyFunction2);
    mod.setHotkey(Keyboard.F4, disconnect);
  }

  log(`${MOD_NAME} ${VERSION} initialized.`);
}

function initLibraries() {
  collisionObjects.init(mod);
}

function initCallbacks() {
  postUpdate.init(); // 1
  postRender.init(); // 2
  evaluateCache.init(); // 8
  postPlayerInit.init(); // 9
  entityTakeDmg.init(); // 11
  postCurseEval.init(); // 12
  inputAction.init(); // 13
  preGameExit.init(); // 17
  postNPCRender.init(); // 28
  postPickupInit.init(); // 34
  postEffectUpdate.init(); // 55
  postEntityKill.init(); // 68
}

function initCallbacksCustom() {
  postNewRoomReordered.init();
  postGameStartedReordered.init();
  postGridEntityUpdate.init();
  postPickupCollect.init();
  postPlayerInitLate.init();
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
