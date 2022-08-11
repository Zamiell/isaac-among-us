import { getScreenCenterPos, log, sfxManager } from "isaacscript-common";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { CutsceneState } from "../enums/CutsceneState";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import g from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { drawFontText, getRoleName } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  switch (g.game.endGameCutscene.state) {
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
  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.TEXT_FADING_IN);
    setBlackSpriteState(BlackSpriteState.SOLID);
  }
}

function postRenderTextFadingIn() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.TEXT);

    // We always play the victory sound effect since the end-game results screen is agnostic to
    // role.
    sfxManager.Play(SoundEffectCustom.VICTORY);
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
  const roleName = getRoleName(g.game.endGameCutscene.winningRole);
  drawFontText(`Victory for: ${roleName}`, centerPos.sub(offset), opacity);
  drawFontText(roleName, centerPos.add(offset), opacity);
}

function getTextOpacity() {
  if (
    g.game === null ||
    g.game.endGameCutscene.state === CutsceneState.TEXT ||
    g.game.endGameCutscene.startRenderFrame === null
  ) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    isaacFrameCount - g.game.endGameCutscene.startRenderFrame;
  const opacity = renderFramesPassed / FADE_TO_BLACK_FRAMES;

  if (g.game.endGameCutscene.state === CutsceneState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.game.endGameCutscene.state === CutsceneState.TEXT_FADING_OUT) {
    return 1 - opacity;
  }

  return 1;
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.endGameCutscene.startRenderFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    isaacFrameCount - g.game.endGameCutscene.startRenderFrame;
  return renderFramesPassed >= FADE_TO_BLACK_FRAMES;
}

export function startEndGameCutscene(): void {
  setState(CutsceneState.FADING_TO_BLACK);
  setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
  disableMinimapAPI();
}

function setState(state: CutsceneState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  g.game.endGameCutscene.state = state;
  g.game.endGameCutscene.startRenderFrame = isaacFrameCount;
  log(`Changed end game cutscene state: ${CutsceneState[state]} (${state})`);
}
