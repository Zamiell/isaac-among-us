import { packTCPMsg } from "./pack";
import { Socket } from "./types/Socket";
import {
  SocketCommandServerToMod,
  SocketCommandServerToModData,
} from "./types/SocketCommands";

export function sendTCP<T extends SocketCommandServerToMod>(
  socket: Socket,
  command: T,
  data: InstanceType<typeof SocketCommandServerToModData[T]>,
): void {
  const packedMsg = packTCPMsg(command, data);
  socket.write(packedMsg);
}
