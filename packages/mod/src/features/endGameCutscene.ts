import { Role } from "common";
import { CollectibleType } from "isaac-typescript-definitions";
import {
  getCollectibleGfxFilename,
  getScreenCenterPos,
  log,
  restart,
  sfxManager,
  VectorZero,
} from "isaacscript-common";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { CutsceneState } from "../enums/CutsceneState";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { g } from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { setSpriteOpacity } from "../sprite";
import { drawFontText, getRoleName } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";

const ITEM_SPRITE_OFFSET = Vector(0, -30);

const itemSprite = Sprite();
itemSprite.Load("gfx/item.anm2", false);
itemSprite.SetFrame("Default", 0);

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  // We don't check for "g.game === null" here because the end-game cutscene data is stored outside
  // of the game.

  switch (g.endGame.state) {
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
      break;
    }

    case CutsceneState.TEXT_FADING_OUT: {
      postRenderTextFadingOut();
      break;
    }

    case CutsceneState.FADING_TO_GAME: {
      postRenderFadingToGame();
      break;
    }
  }
}

function postRenderFadingToBlack() {
  if (hasFadeFinished()) {
    setState(CutsceneState.TEXT_FADING_IN);
    setBlackSpriteState(BlackSpriteState.SOLID);
  }
}

function postRenderTextFadingIn() {
  drawText();

  if (hasFadeFinished()) {
    setState(CutsceneState.TEXT);
  }
}

function postRenderText() {
  drawText();

  if (hasFadeFinished()) {
    setState(CutsceneState.TEXT_FADING_OUT);

    g.game = null;
    restart();
  }
}

function postRenderTextFadingOut() {
  drawText();

  if (hasFadeFinished()) {
    setState(CutsceneState.FADING_TO_GAME);
    setBlackSpriteState(BlackSpriteState.FADING_TO_GAME);
  }
}

function postRenderFadingToGame() {
  if (hasFadeFinished()) {
    setState(CutsceneState.DISABLED);

    const player = Isaac.GetPlayer();
    player.ControlsEnabled = true;
  }
}

function drawText() {
  // Top half
  const centerPos = getScreenCenterPos();
  const offsetFromCenter = Vector(0, 50);
  const topCenterPos = centerPos.sub(offsetFromCenter);
  const offsetFromBetweenLine = Vector(0, 10);
  const opacity = getTextOpacity();
  drawFontText(
    "Victory for:",
    topCenterPos.sub(offsetFromBetweenLine),
    opacity,
  );
  const roleName = getRoleName(g.endGame.winningRole, true);
  drawFontText(roleName, topCenterPos.add(offsetFromBetweenLine), opacity);
  drawItem(topCenterPos, opacity);

  // Bottom half
  const bottomCenterPos = centerPos.add(offsetFromCenter);
  drawFontText(
    "The imposters were:",
    bottomCenterPos.sub(offsetFromBetweenLine),
    opacity,
  );
  drawFontText(
    g.endGame.imposterNames,
    bottomCenterPos.add(offsetFromBetweenLine),
    opacity,
  );
}

function getTextOpacity() {
  if (
    g.endGame.state === CutsceneState.TEXT ||
    g.endGame.startRenderFrame === null
  ) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed = isaacFrameCount - g.endGame.startRenderFrame;
  const opacity = renderFramesPassed / FADE_TO_BLACK_FRAMES;

  if (g.endGame.state === CutsceneState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.endGame.state === CutsceneState.TEXT_FADING_OUT) {
    return 1 - opacity;
  }

  return 1;
}

function drawItem(textPosition: Vector, opacity: float) {
  const position = textPosition.add(ITEM_SPRITE_OFFSET);
  setSpriteOpacity(itemSprite, opacity);
  itemSprite.RenderLayer(0, position);
}

function hasFadeFinished(): boolean {
  if (g.endGame.startRenderFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed = isaacFrameCount - g.endGame.startRenderFrame;
  return renderFramesPassed >= FADE_TO_BLACK_FRAMES;
}

export function startEndGameCutscene(): void {
  setState(CutsceneState.FADING_TO_BLACK);
  setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
  setSprite(g.endGame.winningRole);
  disableMinimapAPI();

  const player = Isaac.GetPlayer();
  player.Velocity = VectorZero;
  player.ControlsEnabled = false;

  // We always play the victory sound effect since the end-game results screen is agnostic to role.
  // The sound effect has a start-up delay, so we can play it now even though the role text has not
  // appeared on the screen quite yet.
  sfxManager.Play(SoundEffectCustom.VICTORY);
}

function setState(state: CutsceneState) {
  const isaacFrameCount = Isaac.GetFrameCount();

  g.endGame.state = state;
  g.endGame.startRenderFrame = isaacFrameCount;
  log(`Changed end game cutscene state: ${CutsceneState[state]} (${state})`);
}

function setSprite(role: Role) {
  const collectibleType =
    role === Role.CREW
      ? CollectibleType.NOTCHED_AXE
      : CollectibleType.MOMS_KNIFE;
  const gfxFileName = getCollectibleGfxFilename(collectibleType);

  itemSprite.ReplaceSpritesheet(0, gfxFileName);
  itemSprite.LoadGraphics();
}
