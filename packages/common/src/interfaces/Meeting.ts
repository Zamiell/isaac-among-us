import type { MeetingPhase } from "../enums/MeetingPhase";
import type { MeetingType } from "../enums/MeetingType";

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
