import { sendTCP } from "./sendTCP";
import { Socket } from "./types/Socket";
import { SocketCommandServerToMod } from "./types/SocketCommands";

export function error(socket: Socket, msg: string): void {
  sendTCP(socket, SocketCommandServerToMod.ERROR, {
    msg,
  });
  const userDescription =
    socket.username === null ? getRemoteAddressTCP(socket) : socket.username;
  console.log(`Client error for "${userDescription}": ${msg}`);
}

export function getRemoteAddressTCP(socket: Socket): string {
  return `${socket.remoteAddress}:${socket.remotePort}`;
}
