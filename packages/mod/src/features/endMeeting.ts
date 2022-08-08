import { getScreenCenterPos } from "isaacscript-common";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { EndMeetingState } from "../enums/EndMeetingState";
import { MeetingResolution } from "../enums/MeetingResolution";
import g from "../globals";
import { enableMinimapAPI } from "../minimapAPI";
import { drawFontText } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";
import { setupMeeting } from "./setupMeeting";

// ModCallback.POST_RENDER (2)
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
      break;
    }

    case EndMeetingState.TEXT: {
      postRenderText();
      break;
    }

    case EndMeetingState.TEXT_FADING_OUT: {
      postRenderTextFadingOut();
      break;
    }

    case EndMeetingState.FADING_TO_GAME: {
      postRenderFadingToGame();
      break;
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
    enableMinimapAPI();
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

  switch (g.game.endMeeting.meetingResolution) {
    case MeetingResolution.NO_EJECT: {
      return "No one was ejected.";
    }

    case MeetingResolution.EJECT: {
      if (g.game.endMeeting.userIDEjected === null) {
        return defaultValue;
      }

      const player = g.game.getPlayerFromUserID(
        g.game.endMeeting.userIDEjected,
      );
      const numAlivePlayers = g.game.getNumAlivePlayers();
      if (player === undefined) {
        return defaultValue;
      }

      return `${player.username} was ejected. (${numAlivePlayers} players remain.)`;
    }
  }
}

function getTextOpacity() {
  if (
    g.game === null ||
    g.game.endMeeting.state === EndMeetingState.TEXT ||
    g.game.endMeeting.startRenderFrame === null
  ) {
    return 1;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    isaacFrameCount - g.game.endMeeting.startRenderFrame;
  const opacity = renderFramesPassed / FADE_TO_BLACK_FRAMES;

  if (g.game.endMeeting.state === EndMeetingState.TEXT_FADING_IN) {
    return opacity;
  }

  if (g.game.endMeeting.state === EndMeetingState.TEXT_FADING_OUT) {
    return 1 - opacity;
  }

  return 1;
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.endMeeting.startRenderFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    isaacFrameCount - g.game.endMeeting.startRenderFrame;
  return renderFramesPassed >= FADE_TO_BLACK_FRAMES;
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
  g.game.endMeeting.startRenderFrame = isaacFrameCount;

  if (state === EndMeetingState.DISABLED) {
    g.game.endMeeting.userIDEjected = null;
  }
}

export function inEndMeeting(): boolean {
  if (g.game === null) {
    return false;
  }

  // We want inputs to be completely disabled until the game has fully faded in.
  return g.game.endMeeting.state !== EndMeetingState.DISABLED;
}
