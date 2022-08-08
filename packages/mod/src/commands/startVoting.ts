import { MeetingPhase } from "../enums/MeetingPhase";
import g from "../globals";
import { StartVotingDataToMod } from "../types/SocketCommands";

export function commandStartVoting(data: StartVotingDataToMod): void {
  if (g.game === null || g.game.meeting === null) {
    return;
  }

  g.game.meeting.meetingPhase = MeetingPhase.VOTING;
  g.game.meeting.timePhaseStarted = data.timePhaseStarted;
  g.game.meeting.phaseLengthSeconds = data.phaseLengthSeconds;
}
