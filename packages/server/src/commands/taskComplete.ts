import { arrayRemoveInPlace } from "../array";
import { endGame } from "../endGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { Role } from "../types/Role";
import { Socket } from "../types/Socket";
import { TaskCompleteDataToServer } from "../types/SocketCommands";

export function commandTaskComplete(
  _socket: Socket,
  data: TaskCompleteDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game, player } = extraData;
  const { task } = data;

  if (game === null || player === null) {
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
