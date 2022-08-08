import { CheckUsernameDataToServer, SocketCommandServerToMod } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import * as users from "../models/users";
import { sendTCP } from "../sendTCP";

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
