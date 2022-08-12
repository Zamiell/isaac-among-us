import { EmergencyButtonCooldownDataToMod } from "common";
import { setEmergencyButtonState } from "../features/emergencyButton";
import g from "../globals";

export function commandEmergencyButtonCooldown(
  data: EmergencyButtonCooldownDataToMod,
): void {
  if (g.game === null) {
    return;
  }

  g.game.emergencyButtonOnCooldown = data.cooldown;
  setEmergencyButtonState();
}
