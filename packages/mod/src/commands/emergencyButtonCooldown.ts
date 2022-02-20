import { setEmergencyButtonState } from "../features/emergencyButton";
import g from "../globals";
import { EmergencyButtonCooldownDataToMod } from "../types/SocketCommands";

export function commandEmergencyButtonCooldown(
  data: EmergencyButtonCooldownDataToMod,
): void {
  if (g.game === null) {
    return;
  }

  g.game.emergencyButtonCooldown = data.cooldown;
  setEmergencyButtonState();
}
