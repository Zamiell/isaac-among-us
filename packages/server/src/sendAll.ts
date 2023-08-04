// A collection of helper functions to send changes in the server state to every connected client.

import type { SocketCommandServerToModData } from "common";
import { SocketCommandServerToMod } from "common";
import type { Game } from "./classes/Game.js";
import { sendTCP } from "./sendTCP.js";
import { tcpSockets } from "./tcpSockets.js";

export function sendAllUserConnected(
  userID: number,
  username: string,
  connected: boolean,
): void {
  sendAll(SocketCommandServerToMod.USER_CONNECTED, {
    userID,
    username,
    connected,
  });
}

export function sendAllNewGame(game: Game, creator: string): void {
  sendAll(SocketCommandServerToMod.NEW_GAME, {
    id: game.id,
    name: game.name,
    creator,
  });
}

function sendAll<T extends SocketCommandServerToMod>(
  command: T,
  data: InstanceType<(typeof SocketCommandServerToModData)[T]>,
) {
  for (const socket of getAllSockets()) {
    sendTCP(socket, command, data);
  }
}

function getAllSockets() {
  return tcpSockets.values();
}
