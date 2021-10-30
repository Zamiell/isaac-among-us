import { sendChat } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import { ChatDataToServer } from "../types/SocketCommands";

export function commandChat(
  socket: Socket,
  data: ChatDataToServer,
  extraData: ExtraCommandData,
): void {
  const { username } = socket;
  const { msg } = data;
  const { game } = extraData;

  if (username === null || game === null) {
    return;
  }

  sendChat(game, username, msg);
}
