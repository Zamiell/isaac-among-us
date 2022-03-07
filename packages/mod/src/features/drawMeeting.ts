import g from "../globals";
import { getTime } from "../network/socketClient";
import { Meeting } from "../types/Meeting";
import { MeetingPhase } from "../types/MeetingPhase";
import { drawFontText, getScreenPosition } from "../utils";
import { isConsoleOpen } from "./console";
import { inEndMeeting } from "./endMeeting";
import { inStartMeeting } from "./startMeeting";

const TEXT_X = 0.85;
const TIME_LEFT_POS = getScreenPosition(TEXT_X, 0.45);
const VOTE_HELP_POS = getScreenPosition(TEXT_X, 0.15);
const LINE_SPACING = Vector(0, 15);

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (
    g.game === null ||
    g.game.meeting === null ||
    inStartMeeting() ||
    inEndMeeting() ||
    isConsoleOpen()
  ) {
    return;
  }

  drawTimeLeftText();
  drawVoteHelpText();
}

function drawTimeLeftText() {
  if (g.game === null || g.game.meeting === null) {
    return;
  }

  const line1Pos = TIME_LEFT_POS;
  drawFontText("Time until", line1Pos);
  const line2Pos = line1Pos.add(LINE_SPACING);
  const verb =
    g.game.meeting.meetingPhase === MeetingPhase.PRE_VOTING ? "starts" : "ends";
  drawFontText(`voting ${verb}:`, line2Pos);
  const line3Pos = line2Pos.add(Vector(0, 25));
  const secondsRemaining = getMeetingPhaseSecondsRemaining(g.game.meeting);
  drawFontText(`${secondsRemaining} seconds`, line3Pos);
}

function getMeetingPhaseSecondsRemaining(meeting: Meeting) {
  const endMeetingTime = meeting.timePhaseStarted + meeting.phaseLengthSeconds;
  const now = getTime();
  let secondsRemaining = endMeetingTime - now;
  if (secondsRemaining < 0) {
    secondsRemaining = 0;
  }

  return math.ceil(secondsRemaining);
}

function drawVoteHelpText() {
  if (
    g.game === null ||
    g.game.meeting === null ||
    g.game.meeting.meetingPhase !== MeetingPhase.VOTING
  ) {
    return;
  }

  const line1Pos = VOTE_HELP_POS;
  drawFontText("Vote with the", line1Pos);
  const line2Pos = line1Pos.add(LINE_SPACING);
  drawFontText("/vote or /voteskip", line2Pos);
  const line3Pos = line2Pos.add(LINE_SPACING);
  drawFontText("commands.", line3Pos);
}
