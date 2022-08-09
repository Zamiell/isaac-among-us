import * as chat from "../chat";
import { MOD_NAME } from "../constants";
import * as socketClient from "../network/socketClient";

export function connectChatCommand(autoLogin: boolean): void {
  if (socketClient.isConnected()) {
    chat.addLocal(`You are already connected to the ${MOD_NAME} server.`);
    return;
  }

  if (!socketClient.connect()) {
    chat.addLocal(
      `Failed to connect to the ${MOD_NAME} server. (Either your internet is down or the server is down.)`,
    );
    return;
  }

  if (!autoLogin) {
    chat.addLocal("Connected!");
    chat.addLocal('Next, select your username with the "/username" command.');
    chat.addLocal('For example: "/username Alice"');
  }
}
