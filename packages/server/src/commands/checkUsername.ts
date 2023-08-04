import type { CheckUsernameDataToServer } from "common";
import { SocketCommandServerToMod } from "common";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import * as users from "../models/users.js";
import { sendTCP } from "../sendTCP.js";

export async function commandCheckUsername(
  socket: Socket,
  data: CheckUsernameDataToServer,
  _extraData: ExtraCommandData,
): Promise<void> {
  const { username } = data;
  const exists = await users.exists(data.username);
  sendTCP(socket, SocketCommandServerToMod.USERNAME, {
    username,
    exists,
  });
}
