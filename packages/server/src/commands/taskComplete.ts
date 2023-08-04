import { Role, TaskCompleteDataToServer } from "common";
import { Game } from "../classes/Game.js";
import { endGame } from "../endGame.js";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";
import { arrayRemoveInPlace } from "../isaacScriptCommonTS.js";

export function commandTaskComplete(
  _socket: Socket,
  data: TaskCompleteDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game, player } = extraData;
  const { task } = data;

  if (game === undefined || player === undefined) {
    return;
  }

  for (const tasks of Object.values(player.tasks)) {
    arrayRemoveInPlace(tasks, task);
  }

  if (allTasksComplete(game)) {
    endGame(game, Role.CREW);
  }
}

function allTasksComplete(game: Game) {
  // Imposters are given tasks, but those do not count towards game completion. Thus, we have to
  // filter out the imposters.
  const crew = game.players.filter((player) => player.role === Role.CREW);

  for (const player of crew) {
    for (const taskList of Object.values(player.tasks)) {
      if (taskList.length > 0) {
        return false;
      }
    }
  }

  return true;
}
