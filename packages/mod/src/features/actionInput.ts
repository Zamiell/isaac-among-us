import { ButtonAction } from "isaac-typescript-definitions";
import { isActionPressedOnAnyInput, todo } from "isaacscript-common";
import { ableToKillAPlayer, kill } from "./kill";
import { ableToReportDeadBody, reportDeadBody } from "./report";
import { ableToVent, useVent } from "./vent";

let isPressed = false;

// ModCallback.POST_UPDATE (1)
export function postUpdate(): void {
  checkInput();
}

function checkInput() {
  if (!isActionPressedOnAnyInput(ButtonAction.BOMB)) {
    isPressed = false;
    return;
  }

  if (isPressed) {
    return;
  }
  isPressed = true;

  actionPressed();
}

function actionPressed() {
  if (ableToKillAPlayer()) {
    kill();
    return;
  }

  if (ableToVent()) {
    useVent();
    return;
  }

  if (ableToReportDeadBody()) {
    reportDeadBody();
    return;
  }

  todo("other actions");
}
