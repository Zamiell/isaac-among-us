import { ButtonAction } from "isaac-typescript-definitions";
import { isActionPressedOnAnyInput, todo } from "isaacscript-common";
import { VentState } from "../enums/VentState";
import { g } from "../globals";
import { ableToKillAPlayer, kill } from "./kill";
import { ableToReportDeadBody, reportDeadBody } from "./report";
import { ableToVent, jumpInVent, jumpOutVent } from "./vents";

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
  if (g.game !== null && g.game.ventState === VentState.IN_VENT) {
    jumpOutVent();
    return;
  }

  if (ableToKillAPlayer()) {
    kill();
    return;
  }

  if (ableToVent()) {
    jumpInVent();
    return;
  }

  if (ableToReportDeadBody()) {
    reportDeadBody();
    return;
  }

  todo("other actions");
}
