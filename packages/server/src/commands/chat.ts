import { ChatDataToServer } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";
import { sendChat } from "../sendGame.js";

export function commandChat(
  socket: Socket,
  data: ChatDataToServer,
  extraData: ExtraCommandData,
): void {
  const { username } = socket;
  const { msg } = data;
  const { game } = extraData;

  if (username === undefined || game === undefined) {
    return;
  }

  sendChat(game, username, msg);
}
