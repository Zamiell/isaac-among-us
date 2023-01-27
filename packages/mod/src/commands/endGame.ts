import { EndGameDataToMod } from "common";
import { AmongUsGame } from "../classes/AmongUsGame";
import { startEndGameCutscene } from "../features/endGameCutscene";
import { g } from "../globals";

export function commandEndGame(data: EndGameDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.endGame.winningRole = data.winningRole;
  g.endGame.imposterNames = getImposterNames(g.game, data.imposterUserIDs);

  startEndGameCutscene();
}

function getImposterNames(game: AmongUsGame, imposterUserIDs: int[]) {
  const names: string[] = [];

  for (const userID of imposterUserIDs) {
    const player = game.getPlayerFromUserID(userID);
    if (player !== undefined) {
      names.push(player.username);
    }
  }

  return names.join(", ");
}
