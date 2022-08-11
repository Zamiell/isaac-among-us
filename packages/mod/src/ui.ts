import { isConsoleOpen } from "./features/console";
import g from "./globals";
import { inCutscene, inEndMeeting } from "./utils";

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
