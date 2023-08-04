import type { StartedDataToMod } from "common";
import { Role } from "common";
import { addLocalChat } from "../chat";
import { startStartGameCutscene } from "../features/startGameCutscene";
import { g } from "../globals";

export function commandStarted(data: StartedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.started = true;
  g.game.imposterUserIDs = data.imposterUserIDs;
  g.game.role = data.imposterUserIDs.length === 0 ? Role.CREW : Role.IMPOSTER;
  g.game.ourTasks = data.tasks;

  addLocalChat("The game has started!");
  startStartGameCutscene();
}
