import { endMeeting } from "../features/endMeeting";
import g from "../globals";
import { EndMeetingDataToMod } from "../types/SocketCommands";

export function commandEndMeeting(data: EndMeetingDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.meeting = null;
  g.game.endMeeting.meetingResolution = data.meetingResolution;
  g.game.endMeeting.userIDEjected = data.userIDEjected;
  endMeeting();
}
