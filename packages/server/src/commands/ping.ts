import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { NoData } from "../types/SocketCommands";

export function commandPing(
  _socket: Socket,
  _data: NoData,
  _extraData: ExtraCommandData,
): void {}
