import { ReconnectDataToServer, SocketCommandServerToMod } from "common";
import { Game } from "../classes/Game";
import { Player } from "../classes/Player";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { logGameEvent } from "../log";
import {
  getGameDescriptionPlayers,
  sendChat,
  sendNewGameDescription,
} from "../sendGame";
import { sendTCP } from "../sendTCP";

export function commandReconnect(
  socket: Socket,
  _data: ReconnectDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
    return;
  }

  sendTCP(socket, SocketCommandServerToMod.RECONNECT, {
    gameID: game.id,
    name: game.name,
    players: getGameDescriptionPlayers(game),
    imposterUserIDs: game.impostorUserIDs,
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
