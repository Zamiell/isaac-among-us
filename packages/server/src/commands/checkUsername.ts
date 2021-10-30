import * as users from "../models/users";
import { sendTCP } from "../sendTCP";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import {
  CheckUsernameDataToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";

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
