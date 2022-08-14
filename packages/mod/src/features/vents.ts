import { Role } from "common";
import { EntityType } from "isaac-typescript-definitions";
import {
  game,
  getEffects,
  getLastFrameOfAnimation,
  VectorZero,
} from "isaacscript-common";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { Vent } from "../enums/Vent";
import { VentState } from "../enums/VentState";
import g from "../globals";
import { VentDescription } from "../interfaces/VentDescription";
import { VENT_DESCRIPTIONS } from "../objects/ventDescriptions";
import { getOurPlayer } from "../players";
import { getSkeldRoomName } from "../skeldRoomMap";
import { getSkeldRoom, goToStageAPIRoom } from "../stageAPI";
import { drawFontText, spawnEntity } from "../utils";
import { shouldShowActionButton } from "./actionSubroutines";

const VENT_DISTANCE = 60;
const TEXT_GRID_INDEX = 7;

export function spawnVents(): void {
  const vents = getVentsForThisRoom();
  for (const ventDescription of vents) {
    spawnVent(ventDescription);
  }
}

function getVentsForThisRoom(): VentDescription[] {
  const room = getSkeldRoom();
  if (room === undefined) {
    return [];
  }

  const ventDescriptions = Object.values(VENT_DESCRIPTIONS);
  return ventDescriptions.filter(
    (ventDescription) => ventDescription.room === room,
  );
}

function spawnVent(ventDescription: VentDescription) {
  const vent = spawnEntity(
    EntityType.EFFECT,
    EffectVariantCustom.VENT,
    0,
    ventDescription.gridIndex,
  );

  const data = vent.GetData();
  data["destination"] = ventDescription.destination;
}

export function ableToVent(): boolean {
  const ourPlayer = getOurPlayer();

  return (
    g.game !== null &&
    g.game.role === Role.IMPOSTER &&
    g.game.ventState === VentState.NONE &&
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

export function jumpInVent(): void {
  if (g.game === null) {
    return;
  }

  const closestVent = getClosestVent();
  if (closestVent === undefined) {
    return;
  }

  const player = Isaac.GetPlayer();
  player.Position = closestVent.Position;
  player.Velocity = VectorZero;
  player.PlayExtraAnimation("Trapdoor");
  player.ControlsEnabled = false;

  g.game.ventState = VentState.JUMPING_IN;
}

export function jumpOutVent(): void {
  if (g.game === null) {
    return;
  }

  const closestVent = getClosestVent();
  if (closestVent === undefined) {
    return;
  }

  const player = Isaac.GetPlayer();
  player.Position = closestVent.Position;
  player.PlayExtraAnimation("Jump");
  player.Visible = true;
  // Controls are only enabled after the animation is finished.

  g.game.ventState = VentState.JUMPING_OUT;
}

export function postRender(): void {
  drawInstructions();

  const player = Isaac.GetPlayer();
  checkJumpIn(player);
  checkJumpOut(player);
}

function drawInstructions() {
  if (g.game === null || g.game.ventState !== VentState.IN_VENT) {
    return;
  }

  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  const modifiedPosition = position.add(Vector(0, 160));
  const text = "Press [card] to switch rooms. Press [bomb] to leave.";
  drawFontText(text, modifiedPosition);
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

  g.game.ventState = VentState.IN_VENT;
}

function checkJumpOut(player: EntityPlayer) {
  if (g.game === null) {
    return;
  }

  const sprite = player.GetSprite();
  if (!sprite.IsPlaying("Jump")) {
    return;
  }

  const frame = sprite.GetFrame();
  const lastFrame = getLastFrameOfAnimation(sprite);
  if (frame !== lastFrame) {
    return;
  }

  player.StopExtraAnimation();
  player.ControlsEnabled = true;

  g.game.ventState = VentState.NONE;
}

export function ventSwitchRoom(): void {
  const closestVent = getClosestVent();
  if (closestVent === undefined) {
    return;
  }

  const data = closestVent.GetData();
  const destination = data["destination"] as Vent | undefined;
  if (destination === undefined) {
    return;
  }

  const ventDescription = VENT_DESCRIPTIONS[destination];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ventDescription === undefined) {
    return;
  }

  const roomName = getSkeldRoomName(ventDescription.room);
  goToStageAPIRoom(roomName, ventDescription.gridIndex);
}
