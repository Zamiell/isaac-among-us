import { addLocalChat } from "../chat";
import { MOD_NAME } from "../constants";
import * as socketClient from "../network/socketClient";

export function connectChatCommand(autoLogin: boolean): void {
  if (socketClient.isConnected()) {
    addLocalChat(`You are already connected to the ${MOD_NAME} server.`);
    return;
  }

  if (!socketClient.connect()) {
    addLocalChat(
      `Failed to connect to the ${MOD_NAME} server. (Either your internet is down or the server is down.)`,
    );
    return;
  }

  if (!autoLogin) {
    addLocalChat("Connected!");
    addLocalChat('Next, select your username with the "/username" command.');
    addLocalChat('For example: "/username Alice"');
  }
}
