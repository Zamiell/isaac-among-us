import { MeetingType } from "common";
import {
  getElapsedRenderFramesSince,
  getScreenBottomRightPos,
  sfxManager,
  VectorZero,
} from "isaacscript-common";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { StartMeetingState } from "../enums/StartMeetingState";
import { g } from "../globals";
import { disableMinimapAPI } from "../minimapAPI";
import { initSprite } from "../sprite";
import { drawFontText } from "../utils";
import { FADE_TO_BLACK_FRAMES, setBlackSpriteState } from "./blackSprite";
import { setupMeeting } from "./setupMeeting";

const TEXT_OFFSET = Vector(0, -10);

const blackSprite = initSprite("gfx/black.anm2");

// ModCallback.POST_RENDER (2)
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
      break;
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

  switch (g.game.meeting.meetingType) {
    case MeetingType.REPORT_BODY: {
      const playerKilled = g.game.getPlayerFromUserID(
        g.game.meeting.userIDKilled,
      );
      if (playerKilled === undefined) {
        return defaultValue;
      }

      return `${playerInitiated.username} reported a dead body: ${playerKilled.username}`;
    }

    case MeetingType.EMERGENCY: {
      return `${playerInitiated.username} called an emergency meeting!`;
    }
  }
}

function hasFadeFinished(): boolean {
  if (g.game === null || g.game.startMeeting.startRenderFrame === null) {
    return false;
  }

  const elapsedRenderFrames = getElapsedRenderFramesSince(
    g.game.startMeeting.startRenderFrame,
  );
  return elapsedRenderFrames >= FADE_TO_BLACK_FRAMES;
}

export function startMeeting(meetingType: MeetingType): void {
  const player = Isaac.GetPlayer();
  player.Velocity = VectorZero;
  player.ControlsEnabled = false;

  // Set the dimensions for the alert strip.
  const bottomRightPos = getScreenBottomRightPos();
  blackSprite.Scale = Vector(bottomRightPos.X, bottomRightPos.Y / 3);

  setState(StartMeetingState.ALERT_STRIP);
  disableMinimapAPI();
  const soundEffect =
    meetingType === MeetingType.REPORT_BODY
      ? SoundEffectCustom.DEAD_BODY_REPORT
      : SoundEffectCustom.EMERGENCY_MEETING;
  sfxManager.Play(soundEffect);
}

function setState(state: StartMeetingState) {
  if (g.game === null || !g.game.started) {
    return;
  }

  const renderFrameCount = Isaac.GetFrameCount();

  g.game.startMeeting.state = state;
  g.game.startMeeting.startRenderFrame = renderFrameCount;
}
