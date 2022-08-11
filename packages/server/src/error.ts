import { SocketCommandServerToMod } from "common";
import { Socket } from "./interfaces/Socket";
import { sendTCP } from "./sendTCP";

export function sendError(socket: Socket, msg: string): void {
  sendTCP(socket, SocketCommandServerToMod.ERROR, {
    msg,
  });
  const userDescription =
    socket.username === undefined
      ? getRemoteAddressTCP(socket)
      : socket.username;
  console.log(`Client error for "${userDescription}": ${msg}`);
}

export function getRemoteAddressTCP(socket: Socket): string {
  return `${socket.remoteAddress}:${socket.remotePort}`;
}
