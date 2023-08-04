import { SocketCommandServerToMod } from "common";
import type { Socket } from "./interfaces/Socket.js";
import { sendTCP } from "./sendTCP.js";

export function sendError(socket: Socket, msg: string): void {
  sendTCP(socket, SocketCommandServerToMod.ERROR, {
    msg,
  });
  const userDescription =
    socket.username ?? getRemoteAddressTCP(socket)
  console.log(`Client error for "${userDescription}": ${msg}`);
}

export function getRemoteAddressTCP(socket: Socket): string {
  return `${socket.remoteAddress}:${socket.remotePort}`;
}
