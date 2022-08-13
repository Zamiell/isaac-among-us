import { Role } from "common";
import { getEffects } from "isaacscript-common";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import g from "../globals";
import { getOurPlayer } from "../players";
import { shouldShowActionButton } from "./actionSubroutines";

const VENT_DISTANCE = 60;

export function ableToVent(): boolean {
  const ourPlayer = getOurPlayer();

  return (
    g.game !== null &&
    g.game.role === Role.IMPOSTER &&
    !g.game.inVent &&
    ourPlayer !== undefined &&
    ourPlayer.alive &&
    shouldShowActionButton() &&
    isVentClose()
  );
}

function isVentClose() {
  const player = Isaac.GetPlayer();
  const closestVent = getClosestVent();
  if (closestVent === undefined) {
    return false;
  }

  const distance = player.Position.Distance(closestVent.Position);
  return distance <= VENT_DISTANCE;
}

function getClosestVent(): EntityEffect | undefined {
  if (g.game === null) {
    return undefined;
  }

  const player = Isaac.GetPlayer();
  const vents = getVents();

  let closestVent: EntityEffect | undefined;
  let closestDistance = math.huge;
  for (const vent of vents) {
    const distance = player.Position.Distance(vent.Position);

    if (distance < closestDistance) {
      closestVent = vent;
      closestDistance = distance;
    }
  }

  return closestVent;
}

export function getVents(): EntityEffect[] {
  return getEffects(EffectVariantCustom.VENT);
}

export function useVent(): void {
  if (g.game === null) {
    return;
  }

  const closestVent = getClosestVent();
  if (closestVent === undefined) {
    return;
  }

  const player = Isaac.GetPlayer();
  player.Position = closestVent.Position;
  player.ControlsEnabled = false;
  g.game.inVent = true;
}
