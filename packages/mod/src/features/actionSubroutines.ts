import { g } from "../globals";
import { inCutscene, inEndMeeting } from "../utils";
import { isConsoleOpen } from "./console";

export function shouldShowActionButton(): boolean {
  return (
    g.game !== null &&
    g.game.started &&
    g.game.meeting === null &&
    !inCutscene() &&
    !inEndMeeting() &&
    !isConsoleOpen()
  );
}
