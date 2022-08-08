import { Role, TaskCompleteDataToServer } from "common";
import { arrayRemoveInPlace } from "../array";
import { Game } from "../classes/Game";
import { endGame } from "../endGame";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";

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
  for (const player of game.players) {
    for (const taskList of Object.values(player.tasks)) {
      if (taskList.length > 0) {
        return false;
      }
    }
  }

  return true;
}
