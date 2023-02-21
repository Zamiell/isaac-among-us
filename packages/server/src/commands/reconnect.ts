import { ReconnectDataToServer, Role, SocketCommandServerToMod } from "common";
import { Game } from "../classes/Game.js";
import { Player } from "../classes/Player.js";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";
import { logGameEvent } from "../log.js";
import {
  getGameDescriptionPlayers,
  sendChat,
  sendNewGameDescription,
} from "../sendGame.js";
import { sendTCP } from "../sendTCP.js";

export function commandReconnect(
  socket: Socket,
  _data: ReconnectDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
    return;
  }

  const imposterUserIDs = player.role === Role.CREW ? [] : game.impostorUserIDs;
  sendTCP(socket, SocketCommandServerToMod.RECONNECT, {
    gameID: game.id,
    name: game.name,
    ownerUserID: game.ownerUserID,
    players: getGameDescriptionPlayers(game),
    imposterUserIDs,
    meeting: game.meeting,
    emergencyButtonOnCooldown: game.emergencyButtonOnCooldown,
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
