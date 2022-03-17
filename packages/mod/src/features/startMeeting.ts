import { ensureAllCases, getScreenBottomRightPos } from "isaacscript-common";
import g from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { initSprite } from "../sprite";
import { BlackSpriteState } from "../types/BlackSpriteState";
import { MeetingType } from "../types/MeetingType";
import { StartMeetingState } from "../types/StartMeetingState";
import { drawFontText } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";
import { setupMeeting } from "./setupMeeting";

const TEXT_OFFSET = Vector(0, -10);

const blackSprite = initSprite("gfx/black.anm2");

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  switch (g.game.startMeeting.state) {
    case StartMeetingState.DISABLED: {
      break;
    }

    case StartMeetingState.ALERT_STRIP: {
      postRenderAlertStrip();
      break;
    }

    case StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP: {
      postRenderFadingToBlackWithAlertStrip();
      break;
    }

    case StartMeetingState.FADING_TO_GAME: {
      postRenderFadingToGame();
      return;
    }

    default: {
      ensureAllCases(g.game.startMeeting.state);
    }
  }
}

function postRenderAlertStrip() {
  drawAlertStrip();

  if (g.game !== null && hasFadeFinished()) {
    setState(StartMeetingState.FADING_TO_BLACK_WITH_ALERT_STRIP);
    setBlackSpriteState(BlackSpriteState.FADING_TO_BLACK);
  }
}

function postRenderFadingToBlackWithAlertStrip() {
  drawAlertStrip();

  if (g.game !== null && hasFadeFinished()) {
    setState(StartMeetingState.FADING_TO_GAME);
    setBlackSpriteState(BlackSpriteState.FADING_TO_GAME);
    setupMeeting(false);
  }
}

function postRenderFadingToGame() {
  if (g.game !== null && hasFadeFinished()) {
    setState(StartMeetingState.DISABLED);
    setBlackSpriteState(BlackSpriteState.DISABLED);
    // TODO start meeting countdown?
  }
}

function drawAlertStrip() {
  const bottomRightPos = getScreenBottomRightPos();
  const position = Vector(0, bottomRightPos.Y / 3);
  blackSprite.RenderLayer(0, position);

  const opacity = 1;
  const centerPos = bottomRightPos.div(2);
  const aboveCenterPos = centerPos.add(TEXT_OFFSET);
  const text = getAlertText();
  drawFontText(text, aboveCenterPos, opacity);
}

function getAlertText() {
  const defaultValue = "???";

  if (g.game === null || g.game.meeting === null) {
    return defaultValue;
  }

  const playerInitiated = g.game.getPlayerFromUserID(
    g.game.meeting.userIDInitiated,
  );
  if (playerInitiated === undefined) {
    return defaultValue;
  }

  if (g.game.meeting.meetingType === MeetingType.REPORT_BODY) {
    const playerKilled = g.game.getPlayerFromUserID(
      g.game.meeting.userIDKilled,
    );
    if (playerKilled === undefined) {
      return defaultValue;
    }
    return `${playerInitiated.username} reported a dead body: ${playerKilled.username}`;
  }

  if (g.game.meeting.meetingType === MeetingType.EMERGENCY) {
    return `${playerInitiated.username} called an emergency meeting!`;
  }

  return defaultValue;
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.startMeeting.startRenderFrame === null) {
    return false;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const renderFramesPassed =
    isaacFrameCount - g.game.startMeeting.startRenderFrame;
  return renderFramesPassed >= FADE_TO_BLACK_FRAMES;
}

export function startMeeting(): void {
  const player = Isaac.GetPlayer();
  player.Velocity = Vector.Zero;

  // Set the dimensions for the alert strip
  const bottomRightPos = getScreenBottomRightPos();
  blackSprite.Scale = Vector(bottomRightPos.X, bottomRightPos.Y / 3);

  setState(StartMeetingState.ALERT_STRIP);
  disableMinimapAPI();
}

function setState(state: StartMeetingState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  g.game.startMeeting.state = state;
  g.game.startMeeting.startRenderFrame = isaacFrameCount;
}

export function inStartMeeting(): boolean {
  if (g.game === null || g.game.meeting === null) {
    return false;
  }

  return (
    g.game.startMeeting.state !== StartMeetingState.DISABLED &&
    g.game.startMeeting.state !== StartMeetingState.FADING_TO_GAME
  );
}
