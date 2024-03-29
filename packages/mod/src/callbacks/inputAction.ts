import { IS_DEV } from "common";
import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { isAfterGameFrame, isMoveAction } from "isaacscript-common";
import { g } from "../globals";
import { mod } from "../mod";
import { inCutscene, inEndMeeting } from "../utils";

export function init(): void {
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
): boolean | float | undefined {
  if (isAfterGameFrame(0)) {
    return undefined;
  }

  if (isMoveAction(buttonAction)) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function disableCutsceneInputs(
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {
  if (buttonAction === ButtonAction.CONSOLE) {
    return undefined;
  }

  if (shouldDisableCutsceneInputs()) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function shouldDisableCutsceneInputs(): boolean {
  if (g.game === null) {
    return false;
  }

  return inCutscene() || g.game.meeting !== null || inEndMeeting();
}

function disableVanillaConsole(
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.CONSOLE) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function disableReset(
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.RESTART) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}
