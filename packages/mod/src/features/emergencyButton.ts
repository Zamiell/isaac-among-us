import { getEffects, removeAllEffects } from "isaacscript-common";
import { ButtonSubType, EffectVariantCustom } from "../enums";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { SkeldRoom } from "../types/SkeldRoom";
import { setButtonState, spawnButton } from "./buttonSpawn";

const EMERGENCY_BUTTON_GRID_INDEX = 265;

export function spawnEmergencyButton(): void {
  if (g.game === null) {
    return;
  }

  spawnButton(
    ButtonSubType.EMERGENCY,
    EMERGENCY_BUTTON_GRID_INDEX,
    shouldEmergencyButtonBeEnabled(),
  );
}

export function removeEmergencyButton(): void {
  removeAllEffects(EffectVariantCustom.BUTTON, ButtonSubType.EMERGENCY);
}

export function setEmergencyButtonState(): void {
  if (g.game === null) {
    return;
  }

  const skeldRoom = getSkeldRoom();
  if (skeldRoom !== SkeldRoom.CAFETERIA) {
    return;
  }

  const emergencyButtons = getEffects(
    EffectVariantCustom.BUTTON,
    ButtonSubType.EMERGENCY,
  );
  if (emergencyButtons.length === 0) {
    return;
  }
  const emergencyButton = emergencyButtons[0];
  const enabled = shouldEmergencyButtonBeEnabled();
  setButtonState(emergencyButton, enabled);
}

function shouldEmergencyButtonBeEnabled() {
  if (g.game === null) {
    return false;
  }

  return !g.game.usedEmergencyMeeting && !g.game.emergencyButtonCooldown;
}
