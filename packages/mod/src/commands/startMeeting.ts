import { MeetingPhase } from "../enums/MeetingPhase";
import { MeetingType } from "../enums/MeetingType";
import { startMeeting } from "../features/startMeeting";
import g from "../globals";
import { StartMeetingDataToMod } from "../types/SocketCommands";

export function commandStartMeeting(data: StartMeetingDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.meeting = {
    meetingType: data.meetingType,
    userIDInitiated: data.userIDInitiated,
    userIDKilled: data.userIDKilled,
    playersKilledSinceLastMeeting: data.playersKilledSinceLastMeeting,
    meetingPhase: MeetingPhase.PRE_VOTING,
    timePhaseStarted: data.timePhaseStarted,
    phaseLengthSeconds: data.phaseLengthSeconds,
    votes: data.votes,
  };

  if (
    data.meetingType === MeetingType.EMERGENCY &&
    data.userIDInitiated === g.userID
  ) {
    g.game.usedEmergencyMeeting = true;
  }

  startMeeting();
}
