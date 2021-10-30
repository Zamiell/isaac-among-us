import * as chat from "../chat";
import * as cutscene from "../features/cutscene";
import g from "../globals";
import { Role } from "../types/Role";
import { StartedDataToMod } from "../types/SocketCommands";

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
