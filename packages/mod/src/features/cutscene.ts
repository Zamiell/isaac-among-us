// The cutscene that plays at the beginning of a game

import { ensureAllCases, getScreenCenterPos } from "isaacscript-common";
import g from "../globals";
import { loadMap } from "../loadMap";
import { enableMinimapAPI } from "../minimapAPI";
import { setSpriteOpacity } from "../sprite";
import { BlackSpriteState } from "../types/BlackSpriteState";
import { CutsceneState } from "../types/CutsceneState";
import { Role } from "../types/Role";
import { drawFontText, getRoleText } from "../util";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";

const ITEM_SPRITE_OFFSET = Vector(0, -30);

const itemSprite = Sprite();
itemSprite.Load("gfx/item.anm2", false);
itemSprite.SetFrame("Default", 0);

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  switch (g.game.cutscene.state) {
    case CutsceneState.DISABLED: {
      break;
    }

    case CutsceneState.FADING_TO_BLACK: {
      postRenderFadingToBlack();
      break;
    }

    case CutsceneState.TEXT_FADING_IN: {
      postRenderTextFadingIn();
      return;
    }

    case CutsceneState.TEXT: {
      postRenderText();
      return;
    }

    case CutsceneState.TEXT_FADING_OUT: {
      postRenderTextFadingOut();
      return;
    }

    case CutsceneState.FADING_TO_GAME: {
      postRenderFadingToGame();
      return;
    }

    default: {
      ensureAllCases(g.game.cutscene.state);
    }
  }
}

function postRenderFadingToBlack() {
  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.TEXT_FADING_IN);
    setBlackSpriteState(BlackSpriteState.SOLID);
    loadMap();
  }
}

function postRenderTextFadingIn() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.TEXT);
  }
}

function postRenderText() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.TEXT_FADING_OUT);
  }
}

function postRenderTextFadingOut() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.FADING_TO_GAME);
    setBlackSpriteState(BlackSpriteState.FADING_TO_GAME);
    enableMinimapAPI(true);
  }
}

function postRenderFadingToGame() {
  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.DISABLED);
  }
}

function drawText() {
  if (g.game === null) {
    return;
  }

  const opacity = getTextOpacity();
  const centerPos = getScreenCenterPos();
  const offset = Vector(0, 10);
  drawFontText("Your role:", centerPos.sub(offset), opacity);
  const roleText = getRoleText(g.game.role);
  drawFontText(roleText, centerPos.add(offset), opacity);

  drawItem(centerPos, opacity);
}

function getTextOpacity() {
  if (
    g.game === null ||
    g.game.cutscene.state === CutsceneState.TEXT ||
    g.game.cutscene.startFrame === null
  ) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const framesPassed = isaacFrameCount - g.game.cutscene.startFrame;
  const opacity = framesPassed / FADE_TO_BLACK_FRAMES;

  if (g.game.cutscene.state === CutsceneState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.game.cutscene.state === CutsceneState.TEXT_FADING_OUT) {
    return 1 - opacity;
  }

  return 1;
}

function drawItem(centerPos: Vector, opacity: float) {
  const position = centerPos.add(ITEM_SPRITE_OFFSET);
  setSpriteOpacity(itemSprite, opacity);
  itemSprite.RenderLayer(0, position);
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.cutscene.startFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const framesPassed = isaacFrameCount - g.game.cutscene.startFrame;
  return framesPassed >= FADE_TO_BLACK_FRAMES;
}

export function startCutscene(): void {
  setSprite();
  setState(CutsceneState.FADING_TO_BLACK);
  setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
  enableMinimapAPI(false);
}

function setState(state: CutsceneState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  g.game.cutscene.state = state;
  g.game.cutscene.startFrame = isaacFrameCount;
}

export function inCutscene(): boolean {
  if (g.game === null) {
    return false;
  }

  return g.game.cutscene.state !== CutsceneState.DISABLED;
}

function setSprite() {
  if (g.game === null) {
    return;
  }

  const collectibleType =
    g.game.role === Role.CREW
      ? CollectibleType.COLLECTIBLE_YUM_HEART
      : CollectibleType.COLLECTIBLE_MOMS_KNIFE;

  const itemConfig = Isaac.GetItemConfig();
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return;
  }

  const gfxFileName = itemConfigItem.GfxFileName;
  itemSprite.ReplaceSpritesheet(0, gfxFileName);
  itemSprite.LoadGraphics();
}
