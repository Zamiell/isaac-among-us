import { Role } from "common";
import { getEffects, getLastFrameOfAnimation } from "isaacscript-common";
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
  const vents = getEffects(EffectVariantCustom.VENT);

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
  player.PlayExtraAnimation("Trapdoor");
}

export function postRender(): void {
  const player = Isaac.GetPlayer();
  checkJumpIn(player);
}

function checkJumpIn(player: EntityPlayer) {
  if (g.game === null) {
    return;
  }

  const sprite = player.GetSprite();
  if (!sprite.IsPlaying("Trapdoor")) {
    return;
  }

  const frame = sprite.GetFrame();
  const lastFrame = getLastFrameOfAnimation(sprite);
  if (frame !== lastFrame) {
    return;
  }

  player.StopExtraAnimation();
  player.Visible = false;

  g.game.inVent = true;
}
