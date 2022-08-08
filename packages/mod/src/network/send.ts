import { SocketCommandModToServer, SocketCommandModToServerData } from "common";
import { log } from "isaacscript-common";
import { packTCPMsg } from "./pack";
import * as socketClient from "./socketClient";

export function sendTCP<T extends SocketCommandModToServer>(
  command: T,
  data: InstanceType<typeof SocketCommandModToServerData[T]>,
): void {
  if (!socketClient.isConnected()) {
    return;
  }

  const packedMsg = packTCPMsg(command, data);
  const { sentBytes, errMsg } = socketClient.send(packedMsg, true);
  if (sentBytes === undefined) {
    log(`Failed to send data over the TCP socket: ${errMsg}`);
    socketClient.disconnect();
  }

  if (command !== SocketCommandModToServer.PING) {
    log(`Sent TCP message: ${packedMsg}`);
  }
}

export function sendUDP(data: string): void {
  if (!socketClient.isConnected()) {
    return;
  }

  const { sentBytes, errMsg } = socketClient.send(data, false);
  if (sentBytes === undefined) {
    log(`Failed to send data over the UDP socket: ${errMsg}`);
    socketClient.disconnect();
  }
}
