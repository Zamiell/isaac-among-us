import { getEffects, removeAllEffects } from "isaacscript-common";
import { ButtonSubType } from "../enums/ButtonSubType";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { SkeldRoom } from "../enums/SkeldRoom";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
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
  const emergencyButton = emergencyButtons[0];
  if (emergencyButton === undefined) {
    return;
  }
  const enabled = shouldEmergencyButtonBeEnabled();
  setButtonState(emergencyButton, enabled);
}

function shouldEmergencyButtonBeEnabled() {
  if (g.game === null) {
    return false;
  }

  return !g.game.usedEmergencyMeeting && !g.game.emergencyButtonCooldown;
}
