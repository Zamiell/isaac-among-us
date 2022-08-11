import { EndGameDataToMod } from "common";
import { startEndGameCutscene } from "../features/endGameCutscene";
import g from "../globals";

export function commandEndGame(data: EndGameDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game.endGameCutscene.winningRole = data.winningRole;
  g.game.endGameCutscene.roles = data.roles;

  startEndGameCutscene();
}
