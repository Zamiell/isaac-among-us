import { VectorZero } from "isaacscript-common";
import g from "../globals";
import { initSprite, setSpriteOpacity } from "../sprite";
import { BlackSpriteState } from "../types/BlackSpriteState";

export const FADE_TO_BLACK_FRAMES = 90;

const sprite = initSprite("gfx/black.anm2");
sprite.Scale = Vector(5000, 5000); // Big enough so that it would cover a 4K monitor
let state = BlackSpriteState.DISABLED;
let startRenderFrame: int | null = null;

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  drawBlackSprite();
}

function drawBlackSprite() {
  if (g.game === null || state === BlackSpriteState.DISABLED) {
    return;
  }

  const opacity = getBlackSpriteOpacity();
  setSpriteOpacity(sprite, opacity);
  sprite.RenderLayer(0, VectorZero);
}

function getBlackSpriteOpacity() {
  if (state === BlackSpriteState.SOLID || startRenderFrame === null) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed = isaacFrameCount - startRenderFrame;
  const opacity = renderFramesPassed / FADE_TO_BLACK_FRAMES;

  if (state === BlackSpriteState.FADING_TO_BLACK) {
    return opacity;
  }

  if (state === BlackSpriteState.FADING_TO_GAME) {
    return 1 - opacity;
  }

  return 1;
}

export function setBlackSpriteState(newState: BlackSpriteState): void {
  const isaacFrameCount = Isaac.GetFrameCount();

  state = newState;
  startRenderFrame = isaacFrameCount;
}
