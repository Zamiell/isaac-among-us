import { Role, StartedDataToMod } from "common";
import { addLocalChat } from "../chat";
import { startStartGameCutscene } from "../features/startGameCutscene";
import g from "../globals";

export function commandStarted(data: StartedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.started = true;
  g.game.imposters = data.imposters;
  g.game.role = data.imposters === null ? Role.CREW : Role.IMPOSTER;
  g.game.ourTasks = data.tasks;

  addLocalChat("The game has started!");
  startStartGameCutscene();
}
