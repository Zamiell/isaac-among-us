import { NoData } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";

export function commandPing(
  _socket: Socket,
  _data: NoData,
  _extraData: ExtraCommandData,
): void {}
