import * as chat from "../chat";
import g from "../globals";
import { sendTCP } from "../network/send";
import { SocketCommandModToServer } from "../types/SocketCommands";

export function passwordChatCommand(args: string[]): void {
  if (args.length === 0) {
    chat.addLocal('You must provide a password. (e.g. "/password hunter2")');
    return;
  }

  const username = g.username;
  if (username === null) {
    chat.addLocal(
      'You must specify a username first with the "/username" command. (e.g. "/username Alice")',
    );
    return;
  }

  const password = args.join(" ");
  sendTCP(SocketCommandModToServer.LOGIN, {
    username,
    password,
  });
}
