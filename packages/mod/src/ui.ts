import { isConsoleOpen } from "./features/console";
import { inCutscene } from "./features/cutscene";
import { inEndMeeting } from "./features/endMeeting";
import g from "./globals";

export function shouldShowUIButton(): boolean {
  return (
    g.game !== null &&
    g.game.started &&
    g.game.meeting === null &&
    !inCutscene() &&
    !inEndMeeting() &&
    !isConsoleOpen()
  );
}
