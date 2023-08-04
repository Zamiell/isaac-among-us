import type {
  SocketCommandServerToMod,
  SocketCommandServerToModData,
} from "common";
import type { Socket } from "./interfaces/Socket.js";
import { packTCPMsg } from "./pack.js";

export function sendTCP<T extends SocketCommandServerToMod>(
  socket: Socket,
  command: T,
  data: InstanceType<(typeof SocketCommandServerToModData)[T]>,
): void {
  const packedMsg = packTCPMsg(command, data);
  socket.write(packedMsg);
}
