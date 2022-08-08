import { Role, StartedDataToMod } from "common";
import * as chat from "../chat";
import * as cutscene from "../features/cutscene";
import g from "../globals";

export function commandStarted(data: StartedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.started = true;
  g.game.imposters = data.imposters;
  g.game.role = data.imposters === null ? Role.CREW : Role.IMPOSTER;
  g.game.ourTasks = data.tasks;

  chat.addLocal("The game has started!");
  cutscene.startCutscene();
}
