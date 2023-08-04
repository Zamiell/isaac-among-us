import type { NoData } from "common";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";

export function commandPing(
  _socket: Socket,
  _data: NoData,
  _extraData: ExtraCommandData,
): void {} // eslint-disable-line @typescript-eslint/no-empty-function
