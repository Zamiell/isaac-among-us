import { ensureAllCases, getScreenCenterPos } from "isaacscript-common";
import g from "../globals";
import { BlackSpriteState } from "../types/BlackSpriteState";
import { EndMeetingState } from "../types/EndMeetingState";
import { MeetingResolution } from "../types/MeetingResolution";
import { drawFontText, enableMinimapAPI } from "../util";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";
import { setupMeeting } from "./setupMeeting";

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  switch (g.game.endMeeting.state) {
    case EndMeetingState.DISABLED: {
      break;
    }

    case EndMeetingState.FADING_TO_BLACK: {
      postRenderFadingToBlack();
      break;
    }

    case EndMeetingState.TEXT_FADING_IN: {
      postRenderTextFadingIn();
      return;
    }

    case EndMeetingState.TEXT: {
      postRenderText();
      return;
    }

    case EndMeetingState.TEXT_FADING_OUT: {
      postRenderTextFadingOut();
      return;
    }

    case EndMeetingState.FADING_TO_GAME: {
      postRenderFadingToGame();
      return;
    }

    default: {
      ensureAllCases(g.game.endMeeting.state);
    }
  }
}

function postRenderFadingToBlack() {
  if (g.game !== null && hasFadeFinished()) {
    setState(EndMeetingState.TEXT_FADING_IN);
    setBlackSpriteState(BlackSpriteState.SOLID);
  }
}

function postRenderTextFadingIn() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(EndMeetingState.TEXT);
  }
}

function postRenderText() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(EndMeetingState.TEXT_FADING_OUT);
  }
}

function postRenderTextFadingOut() {
  drawText();

  if (g.game !== null && hasFadeFinished()) {
    setState(EndMeetingState.FADING_TO_GAME);
    setBlackSpriteState(BlackSpriteState.FADING_TO_GAME);
    enableMinimapAPI(true);
    setupMeeting(true);
  }
}

function postRenderFadingToGame() {
  if (g.game !== null && hasFadeFinished()) {
    setState(EndMeetingState.DISABLED);
  }
}

function drawText() {
  if (g.game === null) {
    return;
  }

  const opacity = getTextOpacity();
  const centerPos = getScreenCenterPos();
  const text = getEndOfMeetingText();
  drawFontText(text, centerPos, opacity);
}

function getEndOfMeetingText() {
  const defaultValue = "Unknown";

  if (g.game === null) {
    return defaultValue;
  }

  if (g.game.endMeeting.meetingResolution === MeetingResolution.NO_EJECT) {
    return "No one was ejected.";
  }

  if (
    g.game.endMeeting.meetingResolution === MeetingResolution.EJECT &&
    g.game.endMeeting.userIDEjected !== null
  ) {
    const player = g.game.getPlayerFromUserID(g.game.endMeeting.userIDEjected);
    if (player !== null) {
      return `${
        player.username
      } was ejected. (${g.game.getNumAlivePlayers()} players remain.)`;
    }
  }

  return defaultValue;
}

function getTextOpacity() {
  if (
    g.game === null ||
    g.game.endMeeting.state === EndMeetingState.TEXT ||
    g.game.endMeeting.startFrame === null
  ) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const framesPassed = isaacFrameCount - g.game.endMeeting.startFrame;
  const opacity = framesPassed / FADE_TO_BLACK_FRAMES;

  if (g.game.endMeeting.state === EndMeetingState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.game.endMeeting.state === EndMeetingState.TEXT_FADING_OUT) {
    return 1 - opacity;
  }

  return 1;
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.endMeeting.startFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const framesPassed = isaacFrameCount - g.game.endMeeting.startFrame;
  return framesPassed >= FADE_TO_BLACK_FRAMES;
}

export function endMeeting(): void {
  setState(EndMeetingState.FADING_TO_BLACK);
  setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
}

function setState(state: EndMeetingState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  g.game.endMeeting.state = state;
  g.game.endMeeting.startFrame = isaacFrameCount;

  if (state === EndMeetingState.DISABLED) {
    g.game.endMeeting.userIDEjected = null;
  }
}

export function inEndMeeting(): boolean {
  if (g.game === null) {
    return false;
  }

  // We want inputs to be completely disabled until the game has fully faded in
  return g.game.endMeeting.state !== EndMeetingState.DISABLED;
}
