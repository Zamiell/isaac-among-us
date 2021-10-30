import {
  log,
  ModCallbacksCustom,
  ModUpgraded,
  upgradeMod,
} from "isaacscript-common";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as executeCmd from "./callbacks/executeCmd";
import * as inputAction from "./callbacks/inputAction";
import * as postCurseEval from "./callbacks/postCurseEval";
import * as postEffectUpdate from "./callbacks/postEffectUpdate";
import * as postGameStarted from "./callbacks/postGameStarted";
import * as postNewRoom from "./callbacks/postNewRoom";
import * as postNPCRender from "./callbacks/postNPCRender";
import * as postPlayerInit from "./callbacks/postPlayerInit";
import * as postRender from "./callbacks/postRender";
import * as postUpdate from "./callbacks/postUpdate";
import * as preGameExit from "./callbacks/preGameExit";
import * as postPlayerInitLate from "./callbacksCustom/postPlayerInitLate";
import * as postRoomLoad from "./callbacksCustom/postRoomLoad";
import * as postStageAPINewRoom from "./callbacksCustom/postStageAPINewRoom";
import { MOD_NAME, VERSION } from "./constants";
import { initFeatures } from "./initFeatures";
import { fixPrintFunction } from "./print";

export default function main(): void {
  fixPrintFunction();

  const modVanilla = RegisterMod("isaacAmongUsMod", 1);
  const mod = upgradeMod(modVanilla);

  initFeatures();
  initCallbacks(mod);
  initCallbacksCustom(mod);
  initCallbacksStageAPI();
  initExtra(mod);

  log(`${MOD_NAME} ${VERSION} initialized.`);
}

function initCallbacks(mod: ModUpgraded) {
  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main); // 1
  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender.main); // 2
  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.main); // 8
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit.main); // 9
  mod.AddCallback(ModCallbacks.MC_POST_CURSE_EVAL, postCurseEval.main); // 12
  mod.AddCallback(ModCallbacks.MC_INPUT_ACTION, inputAction.main); // 13
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit.main); // 17
  mod.AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd.main); // 22
}

function initCallbacksCustom(mod: ModUpgraded) {
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED,
    postNewRoom.main,
  );
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED,
    postGameStarted.main,
  );
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE,
    postPlayerInitLate.main,
  );
}

function initCallbacksStageAPI() {
  if (StageAPI === undefined) {
    return;
  }

  // Nuke the existing callback, if it exists
  // (in case we are performing the "luamod" console command)
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

function initExtra(mod: ModUpgraded) {
  postNPCRender.init(mod); // 28
  postEffectUpdate.init(mod); // 55
}
