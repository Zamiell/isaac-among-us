import { IS_DEV } from "../constants";
import { inCutscene } from "../features/cutscene";
import { inEndMeeting } from "../features/endMeeting";
import g from "../globals";

const MOVEMENT_BUTTONS = new Set<ButtonAction>([
  ButtonAction.ACTION_LEFT, // 0
  ButtonAction.ACTION_RIGHT, // 1
  ButtonAction.ACTION_UP, // 2
  ButtonAction.ACTION_DOWN, // 3
]);

export function main(
  _entity: Entity | undefined,
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | void {
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
  const game = Game();
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
  if (buttonAction === ButtonAction.ACTION_CONSOLE) {
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
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.ACTION_CONSOLE) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}

function disableReset(inputHook: InputHook, buttonAction: ButtonAction) {
  if (IS_DEV) {
    return undefined;
  }

  if (buttonAction === ButtonAction.ACTION_RESTART) {
    return inputHook === InputHook.GET_ACTION_VALUE ? 0 : false;
  }

  return undefined;
}
