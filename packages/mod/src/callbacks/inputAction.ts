import { IS_DEV } from "common";
import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import g from "../globals";
import { inCutscene, inEndMeeting } from "../utils";

const MOVEMENT_BUTTONS = new Set<ButtonAction>([
  ButtonAction.LEFT, // 0
  ButtonAction.RIGHT, // 1
  ButtonAction.UP, // 2
  ButtonAction.DOWN, // 3
]);

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.INPUT_ACTION, main);
}

function main(
  _entity: Entity | undefined,
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {
  if (g.game === null) {
    return undefined;
  }

  let returnValue: boolean | float | undefined;

  returnValue = disablePreRunMovement(inputHook, buttonAction);
  if (returnValue !== undefined) {
    return returnValue;
  }

  returnValue = disableCutsceneInputs(inputHook, buttonAction);
  if (returnValue !== undefined) {
    return returnValue;
  }

  returnValue = disableVanillaConsole(inputHook, buttonAction);
  if (returnValue !== undefined) {
    return returnValue;
  }

  returnValue = disableReset(inputHook, buttonAction);
  if (returnValue !== undefined) {
    return returnValue;
  }

  return undefined;
}

function disablePreRunMovement(
  inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount > 0) {
    return undefined;
  }

  if (MOVEMENT_BUTTONS.has(buttonAction)) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function disableCutsceneInputs(
  inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  if (buttonAction === ButtonAction.CONSOLE) {
    return undefined;
  }

  if (shouldDisableCutsceneInputs()) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function shouldDisableCutsceneInputs() {
  if (g.game === null) {
    return false;
  }

  return inCutscene() || g.game.meeting !== null || inEndMeeting();
}

function disableVanillaConsole(
  inputHook: InputHook,
  buttonAction: ButtonAction,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.CONSOLE) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function disableReset(inputHook: InputHook, buttonAction: ButtonAction) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.RESTART) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}
