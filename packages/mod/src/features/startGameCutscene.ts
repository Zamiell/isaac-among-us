import { Role } from "common";
import { CollectibleType } from "isaac-typescript-definitions";
import {
  getCollectibleGfxFilename,
  getScreenCenterPos,
  log,
  sfxManager,
  VectorZero,
} from "isaacscript-common";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { CutsceneState } from "../enums/CutsceneState";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { g } from "../globals";
import { loadMap } from "../loadMap";
import { disableMinimapAPI, enableMinimapAPI } from "../minimapAPI";
import { getOurPlayerIndex } from "../players";
import { setSpriteOpacity } from "../sprite";
import { drawFontText, getRoleName } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";
import { getMeetingCirclePoints } from "./setupMeeting";

const ITEM_SPRITE_OFFSET = Vector(0, -30);

const itemSprite = Sprite();
itemSprite.Load("gfx/item.anm2", false);
itemSprite.SetFrame("Default", 0);

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  switch (g.game.startGameCutscene.state) {
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
    loadMap();
    setStartingPosition();
    sfxManager.Play(SoundEffectCustom.ROLE_REVEAL);
  }
}

function setStartingPosition() {
  const circlePoints = getMeetingCirclePoints();
  const ourPlayerIndex = getOurPlayerIndex();
  if (ourPlayerIndex === undefined) {
    error(
      "Failed to get our player index for the setting the starting cutscene position.",
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ourPosition = circlePoints[ourPlayerIndex]!;
  const player = Isaac.GetPlayer();
  player.Position = ourPosition;
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
    enableMinimapAPI();
  }
}

function postRenderFadingToGame() {
  if (g.game !== null && hasFadeFinished()) {
    setState(CutsceneState.DISABLED);

    const player = Isaac.GetPlayer();
    player.ControlsEnabled = true;
  }
}

function drawText() {
  if (g.game === null) {
    return;
  }

  const centerPos = getScreenCenterPos();
  const offset = Vector(0, 10);
  const opacity = getTextOpacity();
  drawFontText("Your role:", centerPos.sub(offset), opacity);
  const roleName = getRoleName(g.game.role);
  drawFontText(roleName, centerPos.add(offset), opacity);
  drawItem(centerPos, opacity);
}

function getTextOpacity() {
  if (
    g.game === null ||
    g.game.startGameCutscene.state === CutsceneState.TEXT ||
    g.game.startGameCutscene.startRenderFrame === null
  ) {
    return 1;
  }

  const renderFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    renderFrameCount - g.game.startGameCutscene.startRenderFrame;
  const opacity = renderFramesPassed / FADE_TO_BLACK_FRAMES;

  if (g.game.startGameCutscene.state === CutsceneState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.game.startGameCutscene.state === CutsceneState.TEXT_FADING_OUT) {
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
  if (g.game === null || g.game.startGameCutscene.startRenderFrame === null) {
    return false;
  }

  const renderFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    renderFrameCount - g.game.startGameCutscene.startRenderFrame;
  return renderFramesPassed >= FADE_TO_BLACK_FRAMES;
}

export function startStartGameCutscene(): void {
  if (g.game === null) {
    return;
  }

  setState(CutsceneState.FADING_TO_BLACK);
  setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
  setSprite(g.game.role);
  disableMinimapAPI();

  const player = Isaac.GetPlayer();
  player.Velocity = VectorZero;
  player.ControlsEnabled = false;
}

function setState(state: CutsceneState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const renderFrameCount = Isaac.GetFrameCount();

  g.game.startGameCutscene.state = state;
  g.game.startGameCutscene.startRenderFrame = renderFrameCount;
  log(`Changed start game cutscene state: ${CutsceneState[state]} (${state})`);
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
