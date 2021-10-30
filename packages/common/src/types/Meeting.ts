import { MeetingPhase } from "./MeetingPhase";
import { MeetingType } from "./MeetingType";

export interface Meeting {
  meetingType: MeetingType;
  userIDInitiated: number;
  userIDKilled: number;
  playersKilledSinceLastMeeting: number[];
  meetingPhase: MeetingPhase;
  timePhaseStarted: number;
  phaseLengthSeconds: number;
  votes: number[];
}
