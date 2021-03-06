import { logGameEvent } from "../log";
import {
  getGameDescriptionPlayers,
  sendChat,
  sendNewGameDescription,
} from "../sendGame";
import { sendTCP } from "../sendTCP";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Socket } from "../types/Socket";
import {
  ReconnectDataToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";

export function commandReconnect(
  socket: Socket,
  _data: ReconnectDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game, player } = extraData;

  if (game === null || player === null) {
    return;
  }

  sendTCP(socket, SocketCommandServerToMod.RECONNECT, {
    gameID: game.id,
    name: game.name,
    players: getGameDescriptionPlayers(game),
    imposters: game.impostors,
    meeting: game.meeting,
    tasks: player.tasks,
    character: player.character,
    room: player.room,
    enterGridIndex: player.enterGridIndex,
    bodies: game.bodies,
  });

  reconnect(player, game, socket.socketID);
}

function reconnect(player: Player, game: Game, socketID: number) {
  player.connected = true;
  player.socketID = socketID;

  sendNewGameDescription(game);
  sendChat(game, "", `${player.username} reconnected to the game.`);
  logGameEvent(game, `Player "${player.username}" reconnected.`);
}
